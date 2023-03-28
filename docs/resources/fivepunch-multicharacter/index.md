import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# fivepunch-multicharacter

---

A lore friendly multi character script for FiveM.

**Embrace the spirit of Los Santos, @#$% those cute apartments.**

[![Character selection](fivepunch-multicharacter-banner.png)](https://streamable.com/xp5vhe)

---

## Installation

### Download

After the purchase you will receive an email from Tebex containing the instructions to download the resource.

Alternatively, you can go to https://keymaster.fivem.net/asset-grants and download it.

### Setting up

1. Extract the `fivepunch-multicharacter.pack.zip` file to a folder called `fivepunch-multicharacter` inside your resources folder.

2. Add the following to your `server.cfg` to start the resource. Remember to start the character selection resource before the resource where you will consume it's exports.

```cfg
ensure fivepunch-multicharacter
```

3. Start developing!

---

## Integrating

[Check our **open-source** example resource](https://github.com/fivepunch/gtao-multicharacter), to see how to integrate this script with your framework of preference.

The example resource is also a drag-and-drop resource, so you can have a smooth experience while using the **fivepunch-multicharacter**.

By design, we don't bake framework support in our scripts. All of our creations are standalone, but they can be easily integrated with the framework of your preference.

We often create open-source examples of how to use our resources (with framework support included in the example).

---

## Client exports

### `setIntoCharacterSelection()`

Sets the player into the character selection.

#### Parameters

```lua title="CharacterData"
local character = {
  identifier = 1, -- A primitive value
  name = 'Bad Snaily', -- The string that will be displayed in the mugshot board
  model = 'mp_m_freemode_01' -- The character ped model
}
```

```lua title="EnterParameters (optional)"
local parameters = {
  transition = true, -- Enable / disable the transition to the selection screen
  page = 0, -- The starting page of charaters that will be displayed. Max of 4 characters per page,
  drawCursorSprite = true, -- Draw the game native cursor, disable it if you're using NUI
}
```

#### Usage

```lua
  ---@param characters A table of CharacterData
  ---@param parameters An EnterParameters table (optional)
  exports['fivepunch-multicharacter']:setIntoCharacterSelection(characters, parameters)
```

### `setIntoCharacterCreation()`

Sets the player into the character creation.

#### Usage

```lua
  exports['fivepunch-multicharacter']:setIntoCharacterCreation()
```

### `nextPage()`

Navigates to the next page of characters if available.

#### Usage

```lua
  exports['fivepunch-multicharacter']:nextPage()
```

### `previousPage()`

Navigates to the next page of characters if available.

#### Usage

```lua
  exports['fivepunch-multicharacter']:previousPage()
```

### `setSelecting()`

Starts selecting a character using the mouse as input.

```lua
  exports['fivepunch-multicharacter']:setSelecting()
```

### `flipTheBird()`

Stops selecting and makes the character ped play a flip the bird animation while leaving the line up room.

#### Parameters

`Character` [Character](#character)

:::caution

As of **v1.2.0**, this export is synchronous. You don't need to pass a callback parameter anymore, simply continue the flow of your code in the next line.
:::

#### Usage

```lua
  ---@param character A Character table returned from the onCharacterSelect function
  exports['fivepunch-multicharacter']:flipTheBird(character)
  -- do something ...
```

### `walkOutOfTheRoom()`

Stops selecting and makes the character walk out of the line up room.

#### Parameters

`Character` [Character](#character)

#### Usage

```lua
  ---@param character A Character table returned from the onCharacterSelect function
  exports['fivepunch-multicharacter']:walkOutOfTheRoom(character)
  -- do something ...
```

### `deleteCharacter()`

Removes the specified character from the selection. No animations, just deletes the ped and removes the caracter of the characters table.

#### Usage

```lua
  ---@param character A Character table returned from the onCharacterSelect function
  exports['fivepunch-multicharacter']:deleteCharacter(character)
```

### `setOutOfMulticharacter()`

Sets the player out of the multicharacter scene (creation or selection)

#### Parameters

```lua title="ExitParameters (optional)"
local parameters = {
  fadeIn = true, -- If false, it will not fade in the screen after the exiting transition
}
```

#### Usage

```lua
  ---@param parameters An ExitParameters table (optional)
  exports['fivepunch-multicharacter']:setOutOfMulticharacter(parameters)
```

### `setOutOfCharacterSelection()`

:::caution

As of **v1.1.0**, this export is deprecated. Use [`setOutOfMulticharacter`](#setoutofmulticharacter) instead.
:::

Does the same as [`setOutOfMulticharacter`](#setoutofmulticharacter). This is just a compatibility layer.

#### Parameters

```lua title="ExitParameters (optional)"
local parameters = {
  fadeIn = true, -- If false, it will not fade in the screen after the exiting transition
}
```

#### Usage

```lua
  ---@param parameters An ExitParameters table (optional)
  exports['fivepunch-multicharacter']:setOutOfCharacterSelection(parameters)
```

### `Character`

A class representing the character inside the selection

#### Properties

- `identifier` The same type as provided in the CharacterData in [setIntoCharacterSelection](#setIntoCharacterSelection)
- `name` String
- `model` String or Hash
- `ped` Number (EntityId)
- `mugshotBoard` [MugshotBoard](#mugshotboard)

### `MugshotBoard`

#### Properties

A class representing the mugshotBoard of each character. You probably shouldn't interact with this.

- `boardProp` Number (EntityId)
- `textProp` Number (EntityId)
- `scaleform` Number (ScaleformId)

### `onCharacterSpawn()`

Sets the callback that will be executed when a character is spawned.

#### Parameters

`Function` Function that receives [Character](#character) as parameter

#### Usage

```lua
  ---@param fn A function that is executed when the character is spawned
  exports['fivepunch-multicharacter']:onCharacterSpawn(function(character)
    -- myFramework.applyCharacterClothing(character.identifier, character.ped) ...
  end)
```

### `onCharacterSelect()`

Sets the callback that will be executed when a character is selected.

#### Parameters

`Function` Function that receives [Character](#character) as parameter

#### Usage

```lua
  ---@param fn A function that is executed when the character is selected
  exports['fivepunch-multicharacter']:onCharacterSelect(function(character)
    -- Do something ...
  end)
```

---

## Common errors

### Error parsing script / Failed to load script

Your server artifacts are likely outdated. Update your server to version 5181 or above.

### You lack the required entitlement to use fivepunch-multicharacter

Try restarting your server and make sure your server license key is correct. If you bought the resource on the wrong account, you can transfer it to another account on keymaster.

### Failed to verify protected resource

Files were possibly corrupted during transfer. Ensure hidden files are copied; the .fxap file in a protected resource must be included. Some FTP programs skip these files.
