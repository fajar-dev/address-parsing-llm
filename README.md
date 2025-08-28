# address-parsing-llm

> Address parse with Gemini LLM

## Setup

```
bun install
```

## Development

```
bun run dev
```

## Build

```
bun run build
```

## test

```
bun run test
```

## Requirements

- bun
- node 24 or higher

## How To Start
- rename the .env.example file to .env 
- Install dependencies with `bun install`
- Run the server locally with `bun start` or `bun run dev`


## Documentation

> POST `http://localhost:3000/parse`

Example body:
```
{
    "address": "Jl. Haji Misbah Jl. Komp. Multatuli Indah No.1 Blok D, kel.Hamdan, kecamatan Medan Maimun, mdn, Sumatra Utara 20151"
}
```

Example suceess Responds:
```JSON
{
    "success": true,
    "message": "Address parsed successfully",
    "data": {
        "street": "Jalan Haji Misbah Jalan Komplek Multatuli Indah No.1 Blok D",
        "rt": null,
        "rw": null,
        "village": "Hamdan",
        "district": "Medan Maimun",
        "regency": "Medan",
        "province": "Sumatera Utara",
        "postalCode": 20151,
        "country": "Indonesia"
    }
}
```
