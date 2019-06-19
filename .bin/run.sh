REUSE_WINDOW=""
VSCODE_APP_EDITION="Visual Studio Code"

if [ $vscodeEdition == 'code-insiders' ]
then
    VSCODE_APP_EDITION="Visual Studio Code - Insiders"
fi

if [ $vscodeEdition == 'codium' ]
then
    VSCODE_APP_EDITION="VSCodium"
fi

if [ $reuseWindow == 'true' ]
then
    REUSE_WINDOW="-r"
fi

open -a "${VSCODE_APP_EDITION}" "${REUSE_WINDOW}" "$1"

