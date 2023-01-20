# fivem-appearance

Um sistema flexível de customização de aparência para FiveM.

Esse script foi pensado para gerenciar toda customização de um ped no GTA V, com uma convenção própria para lidar com os dados.

# Funcionalidades

- Customização completa do ped (Fisionomia, maquiagens, roupas, acessórios, etc ...)
- Métodos para obter e aplicar cada parte da aparência do ped.
- [Menu de customização próprio](https://streamable.com/t59gdt "Menu de customização").

## Prévia

![Prévia](https://imgur.com/VgNAvgC.png "Prévia do menu de customização")
![Prévia](https://i.imgur.com/wzY7XNu.png "Prévia da seção de aparência")
![Prévia](https://imgur.com/B0m6g6q.png "Prévia da tela de confirmação")

## Instalação

**Download**

Navegue até a seção de lançamentos para obter a última versão.

**Faça build você mesmo**

1. Clone o repositório na pasta `resources/[local]`.
2. Execute o script de build.

   ```bash
   yarn build
   ```

3. Comece o desenvolvimento.

## ConVars

Esse é um script executado no client, portanto você precisará utilizar o comando **setr** para aplicar as convars.

- **fivem-appearance:locale**: o nome de um dos arquivos de tradução dentro de `locales/`, por padrão **en**.
- **fivem-appearance:automaticFade**: Se 0, o jogador pode selecionar a decoração do cabelo (pintura que esconde a pele onde há cabelo), caso contrário será selecionada automaticamente. Por padrão **1**.

Exemplo de `config.cfg`:

```cfg
setr fivem-appearance:locale "en"
setr fivem-appearance:automaticFade 1
ensure fivem-appearance
```

## Client Exports

### Aparência

| Export              | Parâmetros                                     | Retorno           |
| ------------------- | ---------------------------------------------- | ----------------- |
| getPedModel         | ped: _number_                                  | _string_          |
| getPedComponents    | ped: _number_                                  | _PedComponent[]_  |
| getPedProps         | ped: _number_                                  | _PedProp[]_       |
| getPedHeadBlend     | ped: _number_                                  | _PedHeadBlend_    |
| getPedFaceFeatures  | ped: _number_                                  | _PedFaceFeatures_ |
| getPedHeadOverlays  | ped: _number_                                  | _PedHeadOverlays_ |
| getPedHair          | ped: _number_                                  | _PedHair_         |
| getPedTattoos       |                                                | _TattooList_      |
| getPedAppearance    | ped: _number_                                  | _PedAppearance_   |
| setPlayerModel      | model: _string_                                | _Promise\<void\>_ |
| setPedComponent     | ped: _number_, component: _PedComponent_       | _void_            |
| setPedComponents    | ped: _number_, components: _PedComponent[]_    | _void_            |
| setPedProp          | ped: _number_, prop: _PedProp_                 | _void_            |
| setPedProps         | ped: _number_, props: _PedProp[]_              | _void_            |
| setPedFaceFeatures  | ped: _number_, faceFeatures: _PedFaceFeatures_ | _void_            |
| setPedHeadOverlays  | ped: _number_, headOverlays: _PedHeadOverlays_ | _void_            |
| setPedHair          | ped: _number_, hair: _PedHair_                 | _void_            |
| setPedEyeColor      | ped: _number_, eyeColor: _number_              | _void_            |
| setPedTattoos       | ped: _number_, tattoos: _TattooList_           | _void_            |
| setPlayerAppearance | appearance: _PedAppearance_                    | _void_            |
| setPedAppearance    | ped: _number_, appearance: _PedAppearance_     | _void_            |

### Customização

| Export                   | Parâmetros                                                                                    | Retorno |
| ------------------------ | --------------------------------------------------------------------------------------------- | ------- |
| startPlayerCustomization | callback: _((appearance: PedAppearance \| undefined) => void)_, config? _CustomizationConfig_ | _void_  |

## Exemplos

**Comando para customização (Lua)**

```lua
RegisterCommand('customization', function()
  local config = {
    ped = true,
    headBlend = true,
    faceFeatures = true,
    headOverlays = true,
    components = true,
    props = true,
    allowExit = true,
    tattoos = true
  }

  exports['fivem-appearance']:startPlayerCustomization(function (appearance)
    if (appearance) then
      print('Saved')
    else
      print('Canceled')
    end
  end, config)
end, false)
```

**Abrir menu de customização com callback (TypeScript)**

```typescript
const exp = (global as any).exports;

exp["fivem-appearance"].startPlayerCustomization((appearance) => {
  if (appearance) {
    console.log("Customization saved");
    emitNet("genericSaveAppearanceDataServerEvent", JSON.stringify(appearance));
  } else {
    console.log("Customization canceled");
  }
});
```

**Aplicar aparência de player (TypeScript)**

```typescript
const exp = (global as any).exports;

onNet("genericPlayerAppearanceLoadedServerEvent", (appearance) => {
  exp["fivem-appearance"].setPlayerAppearance(appearance);
});
```

## Data

Scripts usados para gerar alguns dados do resource.

[Peds](https://gist.github.com/snakewiz/b37a18e92cc0b112ce0fa57b1096b96b "Gist")

## Créditos

- [TomGrobbe](https://github.com/TomGrobbe) for the customization camera behavior
- [root-cause](https://github.com/root-cause) for some of the game data
- [xIAlexanderIx](https://github.com/xIAlexanderIx) for general inspiration
