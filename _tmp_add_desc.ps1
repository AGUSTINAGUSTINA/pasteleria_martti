$files = Get-ChildItem -Recurse pages/products -Filter *.html
$defaultText = "Delicioso y artesanal, hecho en el dia. Pedilo hoy."
foreach ($file in $files) {
  $lines = Get-Content $file.FullName
  $out = New-Object System.Collections.Generic.List[string]
  $inInfo = $false
  for ($i = 0; $i -lt $lines.Length; $i++) {
    $line = $lines[$i]
    if ($line -match '<div\s+class="info-producto"') {
      $inInfo = $true
    }
    if ($inInfo -and $line -match '<h2>.*</h2>') {
      $out.Add($line)
      # Find next non-empty line without advancing i
      $j = $i + 1
      while ($j -lt $lines.Length -and $lines[$j].Trim() -eq '') { $j++ }
      $next = if ($j -lt $lines.Length) { $lines[$j] } else { '' }
      if ($next -notmatch '<p>') {
        $indent = ($line -replace '(<h2>.*</h2>).*', '$1') | ForEach-Object { $line.Substring(0, $line.IndexOf('<')) }
        $out.Add("$indent<p>$defaultText</p>")
      }
      continue
    }
    $out.Add($line)
    if ($inInfo -and $line -match '</div>' ) {
      # naive close: exit info-producto when closing div after info-producto block
      # This assumes structure uses a single closing div for the block, which matches current files.
      $inInfo = $false
    }
  }
  if ($out.Count -ne $lines.Length -or -not (Compare-Object $lines $out)) {
    Set-Content -Path $file.FullName -Value $out -Encoding UTF8
  }
}
