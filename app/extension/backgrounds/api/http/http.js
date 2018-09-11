function create() {
  console.log('::HTTP:: - create');

  return window.fetch('http://localhost:3000/pranks/create', { method: 'POST' })
    .then(response => response.json());
}

function getById(id) {
  console.log('::HTTP:: - getById');

  return window.fetch(`http://localhost:3000/pranks/${id}`)
    .then(response => response.json());
}

window.HTTP = { create, getById };
