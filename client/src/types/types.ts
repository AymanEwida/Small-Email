import React from "react";

export type Void = () => void;

export type Optional<Type> = Type | undefined;

export type FormEvent = React.FormEvent;
export type Event<T> =  React.ChangeEvent<T>;
export type InputElement = HTMLInputElement;
export type TextAreaElement = HTMLTextAreaElement;
export type SelectElement = HTMLSelectElement;

export type User = {
  _id : string;
  role : string;
  email : string;
  username : string;
  userImg : string;
}

export type Group = {
  _id : string;
  role : string;
  groupEmail : string;
  groupName : string;
  groupImg : string;
}

export type ActionMap<T extends { [index: string]: any }> = {
    [Key in keyof T]: T[Key] extends undefined
      ? {
          type: Key;
        }
      : {
          type: Key;
          payload: T[Key];
        }    
}

export type TreeStructure = {
  name ?: string;
  entry ?: File | void;
  childern ?: TreeStructure[];

}

export type Recipient = {
  recipientID : string;
  role : "user" | "group";
  _id ?: string;
  groupName ?: string;
  username ?: string;
}

export type Draft = {
  to : Recipient[];
  draftSubject : string;
  draftContent : string;
  draftFiles : {file: Buffer, filename: string}[];
  draftImgs : Buffer[];
  _id : string;
}
