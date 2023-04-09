import { getTop5BasketBallPlayers, BasketballPlayer, BasketballPlayersArray } from './basketball';

describe('getTop5BasketBallPlayers', () => {
  let players: BasketballPlayersArray;

  beforeAll(async () => {
    players = await getTop5BasketBallPlayers();
  });

  test('Function returns an array of 5 players', () => {
    expect(players.length).toBe(5);
  });

  test('Function returns an array of BasketballPlayer object type', () => {
    players.forEach((player: BasketballPlayer) => {
      expect(typeof player.name).toBe('string');
      expect(['Guard', 'Forward', 'Center']).toContain(player.position);
      expect(typeof player.height).toBe('number');
      expect(typeof player.weight).toBe('number');
      expect(typeof player.team).toBe('string');
    });
  });

  test('Function returns top 5 basketball players', () => {
    // Write your own assertions to check if the returned players are indeed the top 5
    // For instance (using your own list of top 5 players):
    const top5PlayerNames = ['Michael Jordan', 'LeBron James', 'Kareem Abdul-Jabbar', 'Bill Russell', 'Magic Johnson'];
    players.forEach((player: BasketballPlayer) => {
      expect(top5PlayerNames).toContain(player.name);
    });
  });

  test('Function handles errors', async () => {
    // Simulate or mock an error and test if the function handles it gracefully
    // For instance, you can mock the API call or data source and reject with an error
  });
});
