import React from "react";

export type Void = () => void;

export type FormEvent = React.FormEvent;
export type InputElement = HTMLInputElement;
export type EventInputElement = React.ChangeEvent<HTMLInputElement>;

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
