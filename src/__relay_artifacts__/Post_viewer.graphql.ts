/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _Post_viewer$ref: unique symbol;
export type Post_viewer$ref = typeof _Post_viewer$ref;
export type Post_viewer = {
    readonly id: string;
    readonly totalCount: number | null;
    readonly completedCount: number | null;
    readonly " $refType": Post_viewer$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Post_viewer",
  "type": "User",
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
      "name": "totalCount",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "completedCount",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '8cc876ac632e0c7e24ff471e5684ea3d';
export default node;
