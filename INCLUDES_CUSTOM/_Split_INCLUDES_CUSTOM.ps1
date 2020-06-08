$Path = "C:\Users\RSchu\OneDrive - TruePoint\Repository\ACP\Agencies\CHESTERFIELD"
$InputFile = (Join-Path $Path "INCLUDES_CUSTOM_P.js")
$OutputPath = (Join-Path $Path "INCLUDES_CUSTOM_1")
$OutputFile = "_Header.js"
$Reader = New-Object System.IO.StreamReader($InputFile)
$linecount = 0
While (($Line = $Reader.ReadLine()) -ne $null) {
    #Tell the user what line was read 
    $linecount ++ 
    #Write-Output "$linecount $Line" 

    #If ($Line -like "// Start Script: *") {
    If ($Line.IndexOf("function") -eq 0) {
        $LineIndex = $Line.IndexOf("(")
        If ($LineIndex -eq -1) {
            $LineIndex = $Line.Length
        }
        $OutputFileX1 = $Line.Substring(9,$LineIndex - 9)
        $OutputFileX2 = $OutputFileX1.replace(" ","_").replace(":",";").replace("\","!")
        $OutputFile = $OutputFileX2 + ".js"
        Write-Host "[Start File] $linecount $Line >> $OutputFile" 

    }

    If ($OutputFile -ne $null) { #Output to File 
        Add-Content (Join-Path $OutputPath $OutputFile) $Line
	}
    
    If ($LastLine -match "\}") {
        $OutputFileLast = $OutputFile
        $OutputFile = $null
        
        Write-Host "[End File] $linecount $LastLine" 
    }
}


