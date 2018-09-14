'use strict';

[ { 'id': 1004, 'title': 'The most incredible article', 'tagId': 1, 'tagName': 'foo' },
  { 'id': 1004, 'title': 'The most incredible article', 'tagId': 2, 'tagName': 'bar' },
  { 'id': 1004, 'title': 'The most incredible article', 'tagId': 3, 'tagName': 'baz' },
  { 'id': 1004, 'title': 'The most incredible article', 'tagId': 4, 'tagName': 'qux' },
  { 'id': 1005, 'title': 'Cats are awesome!', 'tagId': 4, 'tagName': 'qux' }];


const lookup = {
  1004: {
    'id': 1004, 'title': 'The most incredible article',
    'tags': [
      { id: 1, name: 'foo' },
      { id: 2, name: 'bar' },
      { id: 3, name: 'baz' },
      { id: 4, name: 'qux' },
    ]
  },
  1005: { 'id': 1005, 'title': 'Cats are awesome!',
    tags: [
      { id: 1, name: 'foo' }
    ]}
};

const result = [
  {
    'id': 1004, 'title': 'The most incredible article',
    'tags': [
      { id: 1, name: 'foo' },
      { id: 2, name: 'bar' },
      { id: 3, name: 'baz' },
      { id: 4, name: 'qux' },
    ]
  },
  { 'id': 1005, 'title': 'Cats are awesome!',
    tags: [
      { id: 1, name: 'foo' }
    ]
  }
];

function hydrateNotes2N(notes) {
  const lookup = {}, result = [];
  notes.forEach(note => {
    if (!lookup[note.id]) {
      lookup[note.id] = note;
      lookup[note.id].tags = [];
    }
    lookup[note.id].tags.push({
      id: note.tagId,
      name: note.tagName
    });
    delete lookup[note.id].tagId;
    delete lookup[note.id].tagName;
  });

  console.log(JSON.stringify(lookup, null, 2));

  for (let note in lookup) {
    result.push(lookup[note]);
  }

  console.log(JSON.stringify(result, null, 2));

  return result;
}

function hydrateNotes1N(notes) {
  const lookup = {}, hydrated = [];
  notes.forEach(note => {
    if (!lookup[note.id]) {
      lookup[note.id] = note;
      lookup[note.id].tags = [];
      hydrated.push(lookup[note.id]);
    }

    if (note.tagId && note.tagName) {
      lookup[note.id].tags.push({
        id: note.tagId,
        name: note.tagName
      });
    }
    delete lookup[note.id].tagId;
    delete lookup[note.id].tagName;
  });

  return hydrated;
}

