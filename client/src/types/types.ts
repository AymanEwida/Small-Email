import React from "react";

export type Void = () => void;

export type FormEvent = React.FormEvent;
export type Event<T> =  React.ChangeEvent<T>;
export type InputElement = HTMLInputElement;
export type TextAreaElement = HTMLTextAreaElement;

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
