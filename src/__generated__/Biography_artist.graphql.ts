/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type Biography_artist = {
    readonly bio: string | null;
    readonly blurb: string | null;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "Biography_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "bio",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "blurb",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = 'c69d884d6a5b77e0d57f6324d613c6be';
export default node;
