# ساخت src/app/favicon.ico از لوگوی برند — بدون نیاز به ابزار خارجی
# اجرا: powershell -ExecutionPolicy Bypass -File scripts/make-favicon.ps1
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$out = Join-Path $root 'src\app\favicon.ico'

$bmp = [System.Drawing.Bitmap]::new(32, 32)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.Clear([System.Drawing.Color]::Transparent)

$navy  = [System.Drawing.Color]::FromArgb(255, 15, 31, 61)
$blue  = [System.Drawing.Color]::FromArgb(255, 29, 82, 235)
$amber = [System.Drawing.Color]::FromArgb(255, 251, 191, 36)

function New-RoundRectPath([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
  $p = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $d = 2 * $r
  $p.AddArc($x, $y, $d, $d, 180, 90)
  $p.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $p.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $p.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $p.CloseFigure()
  return $p
}

# قاب تلویزیون
$outer = New-RoundRectPath 1 4 30 20 5
$g.FillPath([System.Drawing.SolidBrush]::new($navy), $outer)

# صفحه
$inner = New-RoundRectPath 4 6.5 24 15 4
$g.FillPath([System.Drawing.SolidBrush]::new($blue), $inner)

# پایه
$stand = @(
  [System.Drawing.PointF]::new(10, 31),
  [System.Drawing.PointF]::new(22, 31),
  [System.Drawing.PointF]::new(19.5, 28),
  [System.Drawing.PointF]::new(12.5, 28)
)
$g.FillPolygon([System.Drawing.SolidBrush]::new($navy), $stand)

# فلش لوگو
$pen = [System.Drawing.Pen]::new($amber, 2)
$pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$pen.EndCap   = [System.Drawing.Drawing2D.LineCap]::Round
$g.DrawLine($pen, 16, 11, 16, 21)
$arrow = @(
  [System.Drawing.PointF]::new(15, 11),
  [System.Drawing.PointF]::new(20, 13.5),
  [System.Drawing.PointF]::new(15, 16)
)
$g.FillPolygon([System.Drawing.SolidBrush]::new($amber), $arrow)

# چراغ پاور
$g.FillEllipse([System.Drawing.SolidBrush]::new($amber), 23.5, 9, 3, 3)

$g.Dispose()

# بسته‌بندی PNG داخل قالب ICO (سازگار با همه مرورگرها)
$ms = [System.IO.MemoryStream]::new()
$bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
$png = $ms.ToArray()
$ms.Dispose()

$ico = [System.IO.MemoryStream]::new()
$bw = [System.IO.BinaryWriter]::new($ico)
$bw.Write([uint16]0)          # reserved
$bw.Write([uint16]1)          # type: icon
$bw.Write([uint16]1)          # تعداد تصاویر
$bw.Write([byte]32)           # عرض
$bw.Write([byte]32)           # ارتفاع
$bw.Write([byte]0)            # پالت
$bw.Write([byte]0)            # reserved
$bw.Write([uint16]1)          # planes
$bw.Write([uint16]32)         # bpp
$bw.Write([uint32]$png.Length)
$bw.Write([uint32]22)         # offset
$bw.Write($png)
$bw.Flush()
[System.IO.File]::WriteAllBytes($out, $ico.ToArray())
$bw.Dispose()
$ico.Dispose()
$bmp.Dispose()

Write-Host "favicon.ico created at $out ($((Get-Item $out).Length) bytes)"
