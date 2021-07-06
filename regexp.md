==================
REGEXP CHEAT SHEET
==================

By @geochronology - https://github.com/geochronology

Methods
-------

## test()

Checks if regex matches var

Syntax: regex.text(var)

`myRegex.test(myString)`


## match()

Returns array of pattern matches
  * Without /g, only returns first match
  * With /g, returns all matches

Syntax: var.match(regex)

`/regex/.test('string');`


## replace()

Swaps occurences of a regex with something else

* With plain text: wrongText.replace(silverRegex, "blue");
  // returns "The sky is blue"

* With capture groups: "Code Camp".replace(/(\w+)\s(\w+)/, '$2 $1');
  // returns "Camp Code"




Flags
-----

## /i

Ignore case


## /g

Global match




Shorthands
----------

## \w

Equivalent to [A-Za-z0-9_]

`/\w+/` // returns one or more alphanumeric char


## \W

Excludes all alphanumeric chars (opposite of \w)


## \d

Any digit. Equivalent to [0-9]


## \D

Any non-digit. Equivalent to [^0-9]


## \s

Any whitespace. Equivalent to [ \r\t\f\n\v]


## \S

Any non-whitespace. Equivalent to [^ \r\t\f\n\v]




Character Groups
----------------

## [...]

Character group. Checks to see if it matches one of the characters in the group.

`/h[au]m`


## [a-z]

Character range. Checks if it matches any character within the range.


## [1-6]

Number range. Checks if it matches any number within the range.


## [a-z0-9]

Letter and number range. Checks if it matches either of the ranges.


## [^abcd]

Negated character set. Specifies characters you dont want to match.


## (abc|def)

Check if one of the enclosed patterns occurs

`/che(ese|ss)/`   // matches "cheese" or "chess"
## (?:..)?

Optional group. Matches the enclosed pattern 0 or 1 time(s).

`/^(?:1 )?\(\d{3}\) \d{3}-\d{4}$/`

// matches "1 (555) 555-5555" and "(555) 555-5555"


Symbols
-------

## .

Wildcard character. Matches any one character.

`/hu./`


## +

Match one or more occurence. Identifies characters that repeat themselves.

`/a+/`


## *

Match a character that occurs 0 or more times.

With one char:
`/fi*/`:
  "fig"    // returns "fi"
  "foot"   // returns "f"
  "leslie" // returns null

With char range:
`/f[aeiou]*g/`


## ^

Starts with


## $

Ends with




Patterns
--------

## /^moose/

Searches for pattern at the beginning of strings


## /moose$/

Searches for pattern at end of string


## /(...)\1/

Creates a capture group of stuff inside the parens

Each number refers to each subsequent capture group created




Operators
---------

## | (or operator)

Match one of 2 or more options.

/moose|notMoose/
/moose|notMoose|possiblyMoose/


## ? (lazy matching)

Returns the shortest possible matching string. (Default is longest possible.)

"plumply":

`/p[a-z]*l/`   // returns "plumpl"
`/p[a-z]*?l/`  // returns "pl"


## ? (optional character)

Says preceding character is optional. (Useful for British english)

`/colou?r/`


## {x, y} (quantity specifiers)

Specifies range of times something gets repeated (min, max)

* Range: `/a{3,5}h/`
* Lower only: `/a{3,}h/`
* Exact: `/a{3}h/`


## (?=...), (?!...)  (positive/negative lookaheads)

Looks ahead to see if pattern is/isnt there

`(?=bucket)` // looks for bucket
`(?!bucket)` // looks not for bucket


