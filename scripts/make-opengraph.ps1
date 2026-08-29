# ساخت src/app/opengraph-image.png (1200x630) با فونت وزیرمتن — بدون ابزار خارجی
# GDI+ شکل‌دهی و ترتیب کلمات RTL فارسی را صحیح انجام می‌دهد (برخلاف satori)
# اجرا: powershell -ExecutionPolicy Bypass -File scripts/make-opengraph.ps1
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$out = Join-Path $root 'src\app\opengraph-image.png'
$fontDir = Join-Path $root 'src\fonts'

$W = 1200; $H = 630
$bmp = [System.Drawing.Bitmap]::new($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias

# --- پس‌زمینه گرادیانی ---
$rect = [System.Drawing.Rectangle]::new(0, 0, $W, $H)
$bg = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
  $rect,
  [System.Drawing.Color]::FromArgb(255, 10, 20, 40),
  [System.Drawing.Color]::FromArgb(255, 20, 48, 115),
  35)
$g.FillRectangle($bg, $rect)

# --- هاله‌های نور نرم (گرادیان شعاعی) ---
function Add-Glow([System.Drawing.Graphics]$gfx, [float]$cx, [float]$cy, [float]$r, [System.Drawing.Color]$center) {
  $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $path.AddEllipse($cx - $r, $cy - $r, 2 * $r, 2 * $r)
  $pgb = [System.Drawing.Drawing2D.PathGradientBrush]::new($path)
  $pgb.CenterColor = $center
  $pgb.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 0, 0, 0))
  $gfx.FillEllipse($pgb, $cx - $r, $cy - $r, 2 * $r, 2 * $r)
  $pgb.Dispose()
  $path.Dispose()
}
Add-Glow $g 40 40 330 ([System.Drawing.Color]::FromArgb(90, 51, 113, 246))
Add-Glow $g 1170 620 340 ([System.Drawing.Color]::FromArgb(55, 245, 158, 11))
Add-Glow $g 285 305 260 ([System.Drawing.Color]::FromArgb(70, 29, 82, 235))

# --- فونت‌های وزیرمتن ---
$fonts = [System.Drawing.Text.PrivateFontCollection]::new()
$fonts.AddFontFile((Join-Path $fontDir 'Vazirmatn-Regular.ttf'))
$fonts.AddFontFile((Join-Path $fontDir 'Vazirmatn-Bold.ttf'))
$fam = $fonts.Families | Where-Object { $_.Name -eq 'Vazirmatn' } | Select-Object -First 1

$fontBadge = [System.Drawing.Font]::new($fam, 24, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$fontHead  = [System.Drawing.Font]::new($fam, 58, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$fontSub   = [System.Drawing.Font]::new($fam, 25, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$fontPhone = [System.Drawing.Font]::new($fam, 30, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$fontBrand = [System.Drawing.Font]::new($fam, 33, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$fontDom   = [System.Drawing.Font]::new($fam, 23, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)

# --- رنگ‌ها ---
$navy  = [System.Drawing.Color]::FromArgb(255, 15, 31, 61)
$deep  = [System.Drawing.Color]::FromArgb(255, 10, 20, 40)
$blue  = [System.Drawing.Color]::FromArgb(255, 29, 82, 235)
$base  = [System.Drawing.Color]::FromArgb(255, 22, 48, 92)
$amber = [System.Drawing.Color]::FromArgb(255, 251, 191, 36)
$white = [System.Drawing.Color]::FromArgb(255, 255, 255, 255)
$gray  = [System.Drawing.Color]::FromArgb(255, 203, 213, 225)

# --- قالب‌های متن ---
# در حالت RTL در GDI+، تراز Near = لبه راست است
$rtl = [System.Drawing.StringFormat]::new()
$rtl.FormatFlags = [System.Drawing.StringFormatFlags]::DirectionRightToLeft
$rtl.Alignment = [System.Drawing.StringAlignment]::Near
$rtl.LineAlignment = [System.Drawing.StringAlignment]::Near

$rtlCenter = [System.Drawing.StringFormat]::new()
$rtlCenter.FormatFlags = [System.Drawing.StringFormatFlags]::DirectionRightToLeft
$rtlCenter.Alignment = [System.Drawing.StringAlignment]::Center
$rtlCenter.LineAlignment = [System.Drawing.StringAlignment]::Center

$ltrCenter = [System.Drawing.StringFormat]::new()
$ltrCenter.Alignment = [System.Drawing.StringAlignment]::Center
$ltrCenter.LineAlignment = [System.Drawing.StringAlignment]::Center

$ltrRight = [System.Drawing.StringFormat]::new()
$ltrRight.Alignment = [System.Drawing.StringAlignment]::Far
$ltrRight.LineAlignment = [System.Drawing.StringAlignment]::Near

function New-RoundRect([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
  $p = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $d = 2 * $r
  $p.AddArc($x, $y, $d, $d, 180, 90)
  $p.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $p.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $p.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $p.CloseFigure()
  return $p
}

# --- تلویزیون (چپ) ---
$tvFrame = New-RoundRect 70 170 430 270 26
$g.FillPath([System.Drawing.SolidBrush]::new($navy), $tvFrame)
$tvScreen = New-RoundRect 84 184 402 242 18
$g.FillPath([System.Drawing.SolidBrush]::new($blue), $tvScreen)

# برند روی صفحه
$brandRect = [System.Drawing.RectangleF]::new(84, 184, 402, 242)
$g.DrawString('PICHGOSHTI', $fontBrand, [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(235, 255, 255, 255)), $brandRect, $ltrCenter)

# چراغ پاور
$g.FillEllipse([System.Drawing.SolidBrush]::new($amber), 448, 204, 14, 14)

# پایه
$g.FillRectangle([System.Drawing.SolidBrush]::new($navy), 245, 440, 80, 26)
$tvBase = New-RoundRect 180 466 210 20 10
$g.FillPath([System.Drawing.SolidBrush]::new($base), $tvBase)

# --- نشان (بج) بالای متن ---
$pill = New-RoundRect 620 95 510 62 31
$g.FillPath([System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(36, 251, 191, 36)), $pill)
$pillPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(115, 251, 191, 36), 2)
$g.DrawPath($pillPen, $pill)
$pillRect = [System.Drawing.RectangleF]::new(620, 95, 510, 62)
$g.DrawString('پیچ‌گوشتی • مرکز تخصصی تعمیرات تلویزیون', $fontBadge, [System.Drawing.SolidBrush]::new($amber), $pillRect, $rtlCenter)

# --- تیتر اصلی (دو خط، راست‌چین) ---
$headBrush = [System.Drawing.SolidBrush]::new($white)
$headRect1 = [System.Drawing.RectangleF]::new(520, 208, 610, 100)
$g.DrawString('تعمیر تخصصی تلویزیون', $fontHead, $headBrush, $headRect1, $rtl)
$headRect2 = [System.Drawing.RectangleF]::new(520, 310, 610, 100)
$g.DrawString('در تهران', $fontHead, $headBrush, $headRect2, $rtl)

# --- زیرتیتر ---
$subBrush = [System.Drawing.SolidBrush]::new($gray)
$subRect1 = [System.Drawing.RectangleF]::new(520, 428, 610, 44)
$g.DrawString('اعزام تکنسین کمتر از ۲ ساعت • گارانتی کتبی ۳ ماهه', $fontSub, $subBrush, $subRect1, $rtl)
$subRect2 = [System.Drawing.RectangleF]::new(520, 474, 610, 44)
$g.DrawString('همه برندها • عیب‌یابی شفاف قبل از تعمیر', $fontSub, $subBrush, $subRect2, $rtl)

# --- چیپ شماره تلفن و دامنه ---
$chip = New-RoundRect 880 538 250 62 16
$g.FillPath([System.Drawing.SolidBrush]::new($amber), $chip)
$chipRect = [System.Drawing.RectangleF]::new(880, 538, 250, 62)
$g.DrawString('021 9100 1234', $fontPhone, [System.Drawing.SolidBrush]::new($deep), $chipRect, $ltrCenter)

$domRect = [System.Drawing.RectangleF]::new(600, 552, 260, 36)
$g.DrawString('pichgoshti.ir', $fontDom, [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 148, 163, 184)), $domRect, $ltrRight)

$g.Dispose()

# --- ذخیره PNG ---
$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$fonts.Dispose()

Write-Host "opengraph-image.png created at $out ($((Get-Item $out).Length) bytes)"
