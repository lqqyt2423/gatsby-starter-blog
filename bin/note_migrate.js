'use strict';

const fs = require('fs');
const path = require('path');
const mkdirp = require('lq_tools/mkdirp');
const logger = require('lq_tools/logger');

const RAW_DIR = '/Users/gymbo/Documents/person/programming_note';
const TARGET_DIR = '/Users/gymbo/Documents/person/gatsby-starter-blog/content/blog';

const notes = fs.readdirSync(RAW_DIR).filter(i => /^\d{8}.*\.md$/.test(i));
for (const filename of notes) {
  const notePath = path.join(RAW_DIR, filename);
  const targetNoteDir = path.join(TARGET_DIR, filename.replace(/\.md$/, ''));
  const targetNotePath = path.join(targetNoteDir, 'index.md');

  mkdirp.sync(targetNoteDir);

  // date
  const year = filename.slice(0, 4);
  const month = filename.slice(4, 6);
  const day = filename.slice(6, 8);
  const noteDate = new Date(`${year}/${month}/${day}`);

  const content = fs.readFileSync(notePath, 'utf-8');
  const lines = content.split('\n');
  const title = lines[0].replace(/^# /, '').trim();

  const body = lines.slice(1).join('\n').trim();

  const newContent = `---
title: ${title}
date: "${noteDate.toISOString()}"
description: ""
---

${body}`;

  fs.writeFileSync(targetNotePath, newContent);
  logger.info(targetNotePath);
}
