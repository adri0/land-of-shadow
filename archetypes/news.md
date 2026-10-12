---
title: "{{ replaceRE `^\d{4}-\d{2}-\d{2}-` "" .File.ContentBaseName | humanize }}"
date: {{ .Date | time.Format "2006-01-02" }}
summary: ""
# Signed at the end of the post; url is optional and links the name.
author:
  name: ""
  url: ""
---
