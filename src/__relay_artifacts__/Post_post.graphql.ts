/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _Post_post$ref: unique symbol;
export type Post_post$ref = typeof _Post_post$ref;
export type Post_post = {
    readonly complete: boolean | null;
    readonly id: string;
    readonly img_url: string | null;
    readonly title: string | null;
    readonly author: string | null;
    readonly description: string | null;
    readonly " $refType": Post_post$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Post_post",
  "type": "Post",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "complete",
      "args": null,
      "storageKey": null
    },
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
      "name": "img_url",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "author",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "description",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = 'c877bb92cc65f6e44ab7d8d62a73c097';
export default node;
