export type BasketballPlayer = {
  name: string;
  position: 'Guard' | 'Forward' | 'Center';
  height: number;
  weight: number;
  team: string;
};

export type BasketballPlayersArray = BasketballPlayer[];

// @ts-ignore
// @magic
export async function getTop5BasketBallPlayers(): Promise<BasketballPlayersArray> {
  //Return the top 5 baskeball players of all time
}


