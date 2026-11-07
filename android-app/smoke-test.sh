#!/usr/bin/env bash
set -euo pipefail
adb install -r Pocket-Yuki.apk
adb logcat -c
# Verify the very first launch with both network transports disabled.
adb shell svc wifi disable
adb shell svc data disable
adb shell am start -W -n com.yuki.pocket/.MainActivity
for attempt in $(seq 1 30); do
  adb shell uiautomator dump /sdcard/window.xml >/dev/null 2>&1 || true
  adb pull /sdcard/window.xml android-ui.xml >/dev/null 2>&1 || true
  if grep -q 'What do you need\|A little me\|Always with you\|Hey, Mimi' android-ui.xml; then
    adb shell input swipe 540 1700 540 800 500
    adb exec-out screencap -p > android-smoke.png
    adb logcat -d > android-logcat.txt
    if grep -q 'FATAL EXCEPTION' android-logcat.txt; then exit 1; fi
    echo 'PASS: signed APK installed and rendered Pocket Yuki offline.'
    exit 0
  fi
  sleep 2
done
adb logcat -d > android-logcat.txt
adb exec-out screencap -p > android-smoke.png
echo 'The app did not render the expected content.' >&2
exit 1
