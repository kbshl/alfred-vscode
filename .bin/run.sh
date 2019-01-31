REUSE_WINDOW=""

if [ $reuseWindow == 'true' ]
then
  REUSE_WINDOW="-r"
fi

"${vscodeEdition}" "${REUSE_WINDOW}" "$1"
