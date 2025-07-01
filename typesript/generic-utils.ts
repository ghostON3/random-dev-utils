/**
 * A typed version of Object.entries that preserves the key-value tuple types.
 * 
 * @example
 * ```ts
 * const obj = { a: 1, b: 'hello' };
 * type ObjEntries = Entries<typeof obj>;
 * // Result: ['a', number] | ['b', string]
 * ```
 */
export type Entries<T extends object> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

/**
 * Transforms a type `T` into a version that may be displayed more cleanly in IDEs.
 *
 * This utility is mainly for improving developer experience by flattening intersection types
 * into an expanded object shape for better readability.
 *
 * @example
 * ```ts
 * type User = {
 *   id: number;
 *   name: string;
 * };
 *
 * type ExtendedUser = Prettify<User & { age: number }>;
 * // Instead of displaying as an intersection type, IDEs may show ExtendedUser as:
 * // { id: number; name: string; age: number; }
 * ```
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

/**
 * Recursively applies `Prettify` to nested object properties.
 *
 * @example
 * ```ts
 * type Nested = {
 *   user: {
 *     id: number;
 *     name: string;
 *   };
 * };
 * type PrettyNested = DeepPrettify<Nested>;
 * ```
 */
export type DeepPrettify<T> = T extends object
  ? T extends (...args: any) => any
    ? T
    : T extends readonly any[]
    ? T
    : { [K in keyof T]: DeepPrettify<T[K]> }
  : T;

/**
 * Extracts the union of all value types from a given type `T`.
 *
 * Useful for narrowing variables to values inside an enum-like object.
 *
 * @example
 * ```ts
 * enum Colors { 
 *   Red = 'red',
 *   Green = 'green',
 *   Blue = 'blue',
 * }
 * type Color = ValueOf<typeof Colors>;
 * ```
 */
export type ValueOf<T> = T[keyof T];

/**
 * Returns a typed array of key-value pairs from an object.
 * 
 * Unlike `Object.entries`, this preserves type information for both keys and values.
 *
 * @param object - The object to extract entries from.
 * @returns An array of `[key, value]` tuples with precise types.
 */
export function entriesFromObject<T extends object>(object: T): Entries<T> {
  return Object.entries(object) as Entries<T>;
}

/**
 * Represents an object type that is guaranteed to have at least one key.
 *
 * Use this when you want to enforce that an object is not empty.
 */
export type NonEmptyObject<T> = T extends object
  ? keyof T extends never
    ? never
    : T
  : T;

/**
 * Removes `null` and `undefined` from a type `T`.
 */
export type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * A mapped type representing a string-based enum map where keys and values are identical.
 *
 * For example: `{ RED: "RED", GREEN: "GREEN" }`
 */
export type EnumMap<T extends string> = { [K in T]: K };

/**
 * A general enum-like type representing an object with string or numeric values.
 * 
 * Supports numeric or string enums.
 */
export type EnumType = { [key: string]: string | number };

/**
 * Parses and validates a string or numeric value against a provided enum-like object.
 *
 * Returns the value typed as one of the enum values if valid, or null otherwise.
 *
 * @param enumObject - The enum-like object to validate against.
 * @param value - The value to parse and validate.
 * @returns The value cast as one of the enum values or null if invalid.
 *
 * @example
 * ```ts
 * enum Colors { 
 *   Red = 'red',
 *   Green = 'green',
 *   Blue = 'blue',
 * }
 * 
 * parseEnumValue(Colors, 'red'); // 'red'
 * parseEnumValue(Colors, 'yellow'); // null
 * ```
 */
export function parseEnumValue<T extends EnumType>(
  enumObject: T,
  value: string | number | null | undefined
): T[keyof T] | null {
  if (
    value != null &&
    Object.values(enumObject).includes(value as T[keyof T])
  ) {
    return value as T[keyof T];
  }
  return null;
}

/**
 * Type guard that checks if a value is a key of the given object.
 *
 * @param object - The object to check keys against.
 * @param key - The key to validate.
 * @returns True if key exists in object, false otherwise.
 */
export function isKeyOf<T extends object>(
  object: T,
  key: PropertyKey
): key is keyof T {
  return key in object;
}

/**
 * Type guard that checks if a value is one of the values of the given enum-like object.
 *
 * @param enumObject - The enum-like object to check values against.
 * @param value - The value to validate.
 * @returns True if value exists in enumObject values, false otherwise.
 */
export function isEnumValue<T extends EnumType>(
  enumObject: T,
  value: unknown
): value is T[keyof T] {
  return Object.values(enumObject).includes(value as T[keyof T]);
}