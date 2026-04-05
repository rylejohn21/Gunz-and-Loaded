$port = 8000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Server running on http://localhost:$port"
Write-Host "Press Ctrl+C to stop"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $filePath = $request.Url.LocalPath
    if ($filePath -eq '/') { $filePath = '/index.html' }
    $filePath = $filePath -replace '^/', ''
    $fullPath = Join-Path (Get-Location) $filePath
    
    if (Test-Path $fullPath) {
        $content = [System.IO.File]::ReadAllBytes($fullPath)
        $response.ContentType = Get-MimeType $fullPath
        $response.OutputStream.Write($content, 0, $content.Length)
    } else {
        $response.StatusCode = 404
        $response.OutputStream.Write([System.Text.Encoding]::UTF8.GetBytes("404 Not Found"), 0, 13)
    }
    
    $response.Close()
}

function Get-MimeType($path) {
    $ext = [System.IO.Path]::GetExtension($path)
    $mimeTypes = @{
        '.html' = 'text/html'
        '.css' = 'text/css'
        '.js' = 'application/javascript'
        '.png' = 'image/png'
        '.jpg' = 'image/jpeg'
        '.jpeg' = 'image/jpeg'
        '.gif' = 'image/gif'
        '.svg' = 'image/svg+xml'
    }
    if ($mimeTypes[$ext]) {
        return $mimeTypes[$ext]
    } else {
        return 'application/octet-stream'
    }
}
