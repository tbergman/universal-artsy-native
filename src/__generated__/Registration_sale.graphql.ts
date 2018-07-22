/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type Registration_sale = {
    readonly id: string;
    readonly end_at: string | null;
    readonly is_preview: boolean | null;
    readonly live_start_at: string | null;
    readonly name: string | null;
    readonly start_at: string | null;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "Registration_sale",
  "type": "Sale",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "end_at",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "is_preview",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "live_start_at",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "start_at",
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
(node as any).hash = '18cecaddf8fc0acc4e528ede1b2c5c69';
export default node;
