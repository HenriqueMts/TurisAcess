# Envia as variáveis do .env.local para o projeto na Vercel
# (production, preview e development).
#
#   powershell -ExecutionPolicy Bypass -File scripts\vercel-env.ps1
#
# Requer `npx vercel login` feito e o projeto já linkado (`npx vercel link`).

$ErrorActionPreference = 'Stop'

$keys = @(
  'DATABASE_URL',
  'DATABASE_URL_UNPOOLED',
  'NEON_BRANCH',
  'NEON_BRANCH_ID',
  'NEON_FUNCTION_HOST_SUFFIX',
  'NEON_AUTH_BASE_URL',
  'NEON_AUTH_JWKS_URL',
  'NEON_AUTH_COOKIE_SECRET'
)

$envFile = Join-Path $PSScriptRoot '..\.env.local'
if (-not (Test-Path $envFile)) { throw "Arquivo .env.local nao encontrado em $envFile" }

$values = @{}
foreach ($line in Get-Content $envFile) {
  if ($line -match '^\s*([A-Z0-9_]+)\s*=\s*(.*)$') {
    $values[$Matches[1]] = $Matches[2].Trim('"')
  }
}

foreach ($key in $keys) {
  if (-not $values.ContainsKey($key)) {
    Write-Output "AUSENTE  $key"
    continue
  }
  foreach ($target in @('production', 'preview', 'development')) {
    $values[$key] | npx vercel env add $key $target 2>&1 | Out-Null
  }
  Write-Output "OK       $key"
}

Write-Output ''
Write-Output 'Pronto. Agora rode: npx vercel --prod'
