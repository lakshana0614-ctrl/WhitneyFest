
const IDS = ['thursday', 'friday', 'saturday', 'sunday'];

// EDIT THESE TO CONTROL FRIEND MODE
// true = friends can see the itinerary
// false = itinerary stays hidden

const revealed = {
  thursday: true,
  friday: false,
  saturday: false,
  sunday: false
};

async function readReveals() {
  return { ...revealed };
}

async function writeReveals() {
  throw new Error(
    'Day visibility is managed through GitHub.'
  );
}

module.exports = {
  IDS,
  readReveals,
  writeReveals
};
