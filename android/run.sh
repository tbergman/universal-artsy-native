#!/bin/bash

./gradlew ${1:-installDevDebug} --stacktrace && adb shell am start -n adm.tbergman.universalartsy/host.exp.exponent.MainActivity
