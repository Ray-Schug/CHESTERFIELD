
REM Must be used from INCLUDES_CUSTOM directory

del .\_INCLUDES_CUSTOM.js.txt

for %%I in (*.js) do (
    type %%I >> merged.tmp
    echo. >> merged.tmp
)

REM ren merged.tmp _INCLUDES_CUSTOM.js.txt
move /Y merged.tmp .\_INCLUDES_CUSTOM.js.txt
