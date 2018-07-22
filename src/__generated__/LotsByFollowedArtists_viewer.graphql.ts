/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type LotsByFollowedArtists_viewer = {
    readonly sale_artworks: ({
        readonly pageInfo: {
            readonly endCursor: string | null;
            readonly hasNextPage: boolean;
        };
        readonly edges: ReadonlyArray<({
            readonly cursor: string;
            readonly node: ({
                readonly artwork: ({}) | null;
            }) | null;
        }) | null> | null;
    }) | null;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "LotsByFollowedArtists_viewer",
  "type": "Viewer",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": [
          "sale_artworks"
        ]
      }
    ]
  },
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "count",
      "type": "Int",
      "defaultValue": 10
    },
    {
      "kind": "LocalArgument",
      "name": "cursor",
      "type": "String",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "sale_artworks",
      "name": "__LotsByFollowedArtists_sale_artworks_connection",
      "storageKey": "__LotsByFollowedArtists_sale_artworks_connection(include_artworks_by_followed_artists:true,is_auction:true,live_sale:true)",
      "args": [
        {
          "kind": "Literal",
          "name": "include_artworks_by_followed_artists",
          "value": true,
          "type": "Boolean"
        },
        {
          "kind": "Literal",
          "name": "is_auction",
          "value": true,
          "type": "Boolean"
        },
        {
          "kind": "Literal",
          "name": "live_sale",
          "value": true,
          "type": "Boolean"
        }
      ],
      "concreteType": "SaleArtworksConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "pageInfo",
          "storageKey": null,
          "args": null,
          "concreteType": "PageInfo",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "endCursor",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "hasNextPage",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "SaleArtworksEdge",
          "plural": true,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "cursor",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "SaleArtwork",
              "plural": false,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "artwork",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "FragmentSpread",
                      "name": "GenericGrid_artworks",
                      "args": null
                    },
                    v0
                  ]
                },
                v0,
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "__typename",
                  "args": null,
                  "storageKey": null
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = 'dcdc4bfa65bbc0cf27b7a438c8c3a5b7';
export default node;
