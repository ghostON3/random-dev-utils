### Git Sound Effects Script

This script enhances git commands by playing a random sound effect after successful execution of certain git operations (like `add`, `commit`, `push`). The goal of this functionality is to create a dopamine effect and motivation for doing small commits by rewarding the user with positive auditory feedback.

---

```powershell
function Play-RandomSoundFromFolder {
    param([string]$folderPath)
    
    if (-not (Test-Path $folderPath)) {
        Write-Warning "Sound folder not found: $folderPath"
        return
    }
    
    $files = Get-ChildItem -Path $folderPath -File | Where-Object { $_.Extension.ToLower() -in '.mp3','.ogg','.wav','.wma' }

    if ($files.Count -eq 0) {
        Write-Warning "No sound files found in $folderPath"
        return
    }
    
    $randomFile = Get-Random -InputObject $files
    $vlcPath = #EXAMPLE "C:\Program Files (x86)\VideoLAN\VLC\vlc.exe"
    
    if (-not (Test-Path $vlcPath)) {
        Write-Warning "VLC not found at $vlcPath"
        return
    }
    
    Start-Process -FilePath $vlcPath -ArgumentList "--play-and-exit `"$($randomFile.FullName)`"" -WindowStyle Hidden
}

function git {
    param(
        [Parameter(ValueFromRemainingArguments=$true)]
        [string[]]$args
    )
    
    $baseSoundPath = #EXAMPLE "C:\user\soundsFolder"
    
    if ($args.Count -eq 0) {
        # Call original git with no args to show help
        & git.exe
        return
    }
    
    $command = $args[0].ToLower()
    $rest = if ($args.Count -gt 1) { $args[1..($args.Count - 1)] } else { @() }
    
    switch ($command) {
        "add" {
            & git.exe add @rest
            if ($LASTEXITCODE -eq 0) {
                Play-RandomSoundFromFolder "$baseSoundPath\git-add"
            }
        }
        "commit" {
            & git.exe commit @rest
            if ($LASTEXITCODE -eq 0) {
                Play-RandomSoundFromFolder "$baseSoundPath\git-commit"
            }
        }
        "push" {
            & git.exe push @rest
            if ($LASTEXITCODE -eq 0) {
                Play-RandomSoundFromFolder "$baseSoundPath\git-push"
            }
        }
        # Additional commands commented out for future use:
        # "pull" { ... }
        # "merge" { ... }
        # "checkout" { ... }
        # "clone" { ... }
        # "rebase" { ... }
        default {
            # For all other git commands, call original git
            & git.exe @args
        }
    }
}
