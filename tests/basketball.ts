type BasketballPlayer = {
  name: string;
  position: 'Guard' | 'Forward' | 'Center';
  height: number;
  weight: number;
  team: string;
};

type BasketballPlayersArray = BasketballPlayer[];

// @ts-ignore
// @magic
async function get(): Promise<BasketballPlayersArray> {
  //Return the top 5 baskeball players of all time
}

get().then((res) => console.log(res)).catch((err) => console.error(err));
