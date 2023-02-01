import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# fivepunch-character-selection

A lore friendly character selection script for FiveM. Embrace the spirit of Los Santos, @#$% those cute apartments.

![Character selection](fivepunch-character-selection-banner.png)

## Installation

### Download

After the purchase you will receive an email from Tebex containing the instructions to download the resource.

Alternatively, you can go to https://keymaster.fivem.net/asset-grants and download it.

### Setting up

1. Extract the `fivepunch-character-selection.pack.zip` file to a folder called `fivepunch-character-selection` inside your resources folder.

2. Add the following to your `server.cfg` to start the resource. Remember to start the character selection resource before the resource where you will consume it's exports.

  ```cfg
  ensure fivepunch-character-selection
  ```
3. Start developing!

## Framework integration

By design, we don't bake framework support in our scripts. All of our creations are standalone, but they can be easily integrated with the framework of your preference.

Here are some examples of how to integrate this script to some of the more common frameworks in the FiveM community.

<Tabs>
<TabItem value="qb" label="QB">

```lua title="qb-multicharacter/client/main.lua"
local QBCore = exports['qb-core']:GetCoreObject()
local Selection = exports['fivepunch-character-selection']

local cachedCharacters = {}

function enterCharacterSelection()
    local p = promise.new()

    QBCore.Functions.TriggerCallback("qb-multicharacter:server:setupCharacters", function(characters)
        for i = 1, #characters do
            local character = characters[i]

            QBCore.Functions.TriggerCallback('qb-multicharacter:server:getSkin', function(model, data)
                character.model = model ~= nil and tonumber(model) or 'mp_m_freemode_01'
                character.clothing = json.decode(data)

                table.insert(cachedCharacters, character)

                if i == #characters then
                    p:resolve()
                end
            end, character.citizenid)
        end
    end)

    Citizen.Await(p)

    local characters = {}

    for k, character in pairs(cachedCharacters) do
        table.insert(characters, {
            identifier = character.citizenid,
            name = character.name,
            model = character.model,
        })
    end

    Selection:onCharacterSpawn(function(character)
        for k, cached in pairs(cachedCharacters) do
            if cached.identifier == character.identifier then
                TriggerEvent('qb-clothing:client:loadPlayerClothing', cached.clothing, character.ped)
            end
        end
    end)

    Selection:onCharacterSelect(function(character)
        Selection:flipTheBird(character, function()
            Selection:deleteCharacter(character)
            Selection:setOutOfCharacterSelection()

            for k, cached in pairs(cachedCharacters) do
                if character.identifier == cached.citizenid then
                    TriggerServerEvent('qb-multicharacter:server:loadUserData', cached)
                end
            end

            cachedCharacters = {}
        end)
    end)

    Selection:setIntoCharacterSelection(characters)
end

RegisterCommand('exit', function()
    Selection:setOutOfCharacterSelection()

    cachedCharacters = {}
end, false)

CreateThread(function()
    while not NetworkIsSessionStarted() do
      Wait(0)
    end

    enterCharacterSelection()
end)

```

</TabItem>
<TabItem value="esx" label="ESX">

```lua
function helloWorld()
  print('Hello, ESX!')
end
```

</TabItem>
<TabItem value="vrp" label="vRP">

```lua
function helloWorld()
  print('Hello, vRP!')
end
```

</TabItem>
</Tabs>

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
  page = 0, -- The starting page of charaters that will be displayed. Max of 4 characters per page
}
```
#### Usage

```lua
  ---@param characters A table of CharacterData
  ---@param parameters An EnterParameters table (optional)
  exports['fivepunch-character-selection']:setIntoCharacterSelection(characters, parameters)
```

### `nextPage()`

Navigates to the next page of characters if available.

#### Usage

```lua
  exports['fivepunch-character-selection']:nextPage()
```

### `previousPage()`

Navigates to the next page of characters if available.

#### Usage

```lua
  exports['fivepunch-character-selection']:previousPage()
```

### `setSelecting()`

Starts selecting a character using the mouse as input.

```lua
  exports['fivepunch-character-selection']:setSelecting()
```

### `flipTheBird()`

Stops selecting and makes the character ped play a flip the bird animation while leaving the line up room.

#### Parameters 

`Character` [Character](#character)

`Function` (optional)

#### Usage

```lua
  ---@param character A Character table returned from the onCharacterSelect function
  ---@param fn A function that is executed when the animation is completed (optional)
  exports['fivepunch-character-selection']:flipTheBird(character, function()
    -- Do something ...
  end)
```

### `deleteCharacter()`

Removes the specified character from the selection. No animations, just deletes the ped and removes the caracter of the characters table.

#### Usage

```lua
  ---@param character A Character table returned from the onCharacterSelect function
  exports['fivepunch-character-selection']:deleteCharacter(character)
```

### `setOutOfCharacterSelection()`

Sets the player out of the character selection

#### Parameters 

```lua title="ExitParameters (optional)"
local parameters = {
  fadeIn = true, -- If false, it will not fade in the screen after the exiting transition
}
```
#### Usage

```lua
  ---@param parameters An ExitParameters table.
  exports['fivepunch-character-selection']:setOutOfCharacterSelection(parameters)
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
  exports['fivepunch-character-selection']:onCharacterSpawn(function(character)
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
  exports['fivepunch-character-selection']:onCharacterSelect(function(character)
    -- Do something ...
  end)
```

## Common errors

### Error parsing script / Failed to load script

Your server artifacts are likely outdated. Update your server to version 5181 or above.

### You lack the required entitlement to use fivepunch-character-selection

Try restarting your server and make sure your server license key is correct. If you bought the resource on the wrong account, you can transfer it to another account on keymaster.

### Failed to verify protected resource

Files were possibly corrupted during transfer. Ensure hidden files are copied; the .fxap file in a protected resource must be included. Some FTP programs skip these files.
