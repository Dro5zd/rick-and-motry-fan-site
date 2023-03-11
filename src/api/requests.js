const requests = {
    fetchCharacters: '/character',
    fetchCharacterDetails: (characterId) => `/character/${characterId}`,
    searchCharacter: (characterName) => `/character/?name=${characterName}`,
}

export default requests