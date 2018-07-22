/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type Sales_viewer = {
    readonly sales: ReadonlyArray<({
        readonly href: string | null;
        readonly live_start_at: string | null;
    }) | null> | null;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "Sales_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "sales",
      "storageKey": "sales(is_auction:true,live:true,size:100,sort:\"TIMELY_AT_NAME_ASC\")",
      "args": [
        {
          "kind": "Literal",
          "name": "is_auction",
          "value": true,
          "type": "Boolean"
        },
        {
          "kind": "Literal",
          "name": "live",
          "value": true,
          "type": "Boolean"
        },
        {
          "kind": "Literal",
          "name": "size",
          "value": 100,
          "type": "Int"
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "TIMELY_AT_NAME_ASC",
          "type": "SaleSorts"
        }
      ],
      "concreteType": "Sale",
      "plural": true,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "SaleListItem_sale",
          "args": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "href",
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
          "name": "__id",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "LotsByFollowedArtists_viewer",
      "args": null
    }
  ]
};
(node as any).hash = '25e30e3a3dcbcda3c87d9765bdde71a5';
export default node;
