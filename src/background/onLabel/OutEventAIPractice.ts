import LogEntry from "../../types/logDecoder";
import selectDeck from "../selectDeck";
import { convertDeckFromV3, Deck, ArenaV3Deck } from "mtgatool-shared";

interface EntryJson {
  params: {
    deck: string;
  };
}

interface Entry extends LogEntry {
  json: () => EntryJson;
}

export default function OutEventAIPractice(entry: Entry): void {
  const json = entry.json();
  if (!json) return;
  const parsedDeck = JSON.parse(json.params.deck) as ArenaV3Deck;
  const v2deck = convertDeckFromV3(parsedDeck);
  selectDeck(new Deck(v2deck));
}
