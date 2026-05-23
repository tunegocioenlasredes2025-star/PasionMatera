# Pasion Matera 7 - image optimizer
# Resizes + compresses source PNGs into web-ready WebP files mapped to product slugs.
# Matches source files by distinctive ASCII substrings (robust against emojis/accents).
$ErrorActionPreference = "Stop"
$src = "C:/TNR/Tu Pasion"
$out = "C:/TNR/PasionMatera7/assets/products"

# output slug  ->  -like pattern (ASCII only; * = any chars incl. emoji/accents)
$map = [ordered]@{
  # COMBOS
  "combo-premium"                          = "*Combo premium*87.980*"
  "combo-boca"                             = "*COMBO BOCA*28.800*"
  "combo-river"                            = "*COMBO RIVER*28.800*"
  "combo-latas-termico"                    = "*COMBO LATAS FORRADAS*9590*"
  "combo-camionero-canasta"                = "*CAMIONERO ALGARROBO*CANASTA ECO*25.000*"
  "combo-imperial-termo"                   = "*IMPERIAL ALPACA*TERMO 1L*41.300*"
  "combo-imperial-guarda-alpaca"           = "*IMPERIAL GUARDA ALPACA*37.500*"
  # ALGARROBO
  "algarrobo-imperial-premium"             = "*Imperial algarrobo premium*26.980*"
  "algarrobo-base-alpaca"                  = "*algarrrobo con base de alpaca 40.000*"
  "algarrobo-base-alpaca-bronce"           = "*algarrobo con*base de alpaca y bronce 40.000*"
  "algarrobo-laqueado"                     = "*algarrobo laqueado 20.000*"
  "algarrobo-virola-alpaca"                = "*Mate de algarrobo virola de alpaca 23.980*"
  "algarrobo-camionero"                    = "*Camionero de algarrobo 15.000*"
  # IMPERIALES
  "imperial-sol-de-mayo"                   = "*Imperial sol de mayo*28.990*"
  "imperial-virola-alpaca-invertida"       = "*virola de alpaca invertida 28.000*"
  "imperial-virola-bronce"                 = "*Imperial virola de bronce 21.000*"
  "imperial-interior-acero"                = "*Imperial interior de acero 20.000*"
  "imperial-plastico"                      = "*de pl*stico 9980*"
  "imperial-hojita-borravino"              = "*Imperial hojita*color borravino 41.985*"
  "imperial-virola-cincelada"              = "*Imperial premium virola cincelada 28.000*"
  "imperial-cuero-repujado-borravino"      = "*Imperial virola cincelada, cuero repujado borravino 29.000*"
  "imperial-alpaca-con-base"               = "*Imperial de alpaca con base 37.600*"
  "imperial-gajo-pelotas-base-alpaca"      = "*Imperial gajo pelotas con base de alpaca 38.000*"
  "imperial-virola-alpaca-cuero-repujado"  = "*Imperial *virola de alpaca cuero repujado 30.000*"
  "imperial-alpaca-gajos-pelota"           = "*Imperil de alpaca con gajos de pelota 30.000*"
  "imperial-cuero-croco"                   = "*virola de alpaca cuero croco 30.000*"
  "imperial-escudo-argentina"              = "*escudo de argentina 28.500*"
  "imperial-dije-boca-bronce"              = "*dije de bronce de boca 35.000*"
  "imperial-sol-de-mayo-alpaca"            = "*dije de sol de mayo 30.000*"
  "imperial-river-alpaca"                  = "*virola de alpaca river 29.000*"
  "imperial-vaquita"                       = "*vaquita 25.000*"
  "imperial-color-suela"                   = "*color suela 25.000*"
  "imperial-azul-alpaca"                   = "*Imperial azul virola de alpaca 25.000*"
  "imperial-botitas-alpaca"                = "*botitas de alpaca*33.500*"
  "imperial-esquinero-base-alpaca"         = "*esquinero con bases de alpaca 36.400*"
  "imperial-river-premium"                 = "*Imperial premium river plate 62.000*"
  "imperial-dije-boca-alpaca"              = "*Imperial *de alpaca dije de boca 29.000*"
  "imperial-afa"                           = "*Mate imperial de alpaca afa 29.000*"
  "imperial-rosa"                          = "*virola de alpca rosa 25.000*"
  # TORPEDOS
  "torpedo-algarrobo-virola"               = "*Torpedo de algarrobo virola 25.000*"
  "torpedo-algarrobo"                      = "*Torpedo algarrobo 13.980*"
  "torpedo-futbolero"                      = "*Torpedo futbolero*35.990*"
  "torpedo-virola-alpaca-calada"           = "*TORPEDO VIROLA DE ALPACA CALADA*45.000*"
  "torpedo-virola-acero-calabaza"          = "*Torpedo virola de acero de calabaza 16.950*"
  "torpedo-cuero-negro-calabaza"           = "*mate torpedo*cuero negro*calabaza 25.000*"
  "torpedo-virola-cincelada"               = "*Torpedo virola cincelada 30.000*"
  "torpedo-criollo-cuero-repujado"         = "*Torpedo criollo cuero repujado*32.990*"
  "torpedo-cuero-borravino"                = "*Torpedo virola de alpaca cincelada*Cuero liso borravino*40.000*"
}

$files = Get-ChildItem -LiteralPath $src -Filter *.png
$ok = 0; $miss = 0
foreach ($entry in $map.GetEnumerator()) {
  $slug = $entry.Key
  $pattern = $entry.Value
  $match = $files | Where-Object { $_.Name -like $pattern } | Select-Object -First 1
  if ($null -ne $match) {
    $outPath = Join-Path $out ($slug + ".webp")
    & magick $match.FullName -resize "1100x1100>" -strip -quality 80 -define webp:method=6 $outPath
    if (Test-Path -LiteralPath $outPath) { $ok++ } else { Write-Host "CONVERT FAILED: $slug"; $miss++ }
  } else {
    Write-Host "NO MATCH for slug '$slug'  pattern: $pattern"; $miss++
  }
}

# Brand logo (preserve transparency)
$logo = $files | Where-Object { $_.Name -like "LOGO*" } | Select-Object -First 1
if ($null -ne $logo) {
  & magick $logo.FullName -resize "640x640>" -strip -quality 92 -define webp:method=6 "C:/TNR/PasionMatera7/assets/logo.webp"
  & magick $logo.FullName -resize "64x64" -strip "C:/TNR/PasionMatera7/assets/favicon.png"
  Write-Host "Logo converted."
} else {
  Write-Host "LOGO not found."
}

Write-Host "DONE. Converted=$ok  Missing/Failed=$miss"
