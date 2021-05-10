package main

import (
	_ "embed"

	"github.com/wailsapp/wails"
)

func basic() string {
	return "World!"
}

//go:embed frontend/public/build/bundle.js
var js string

//go:embed frontend/public/build/bundle.css
var css string

func main() {
	flat := Flat{db: make(map[string][]string)}

	app := wails.CreateApp(&wails.AppConfig{
		Width:     1024,
		Height:    768,
		Title:     "guarko",
		Resizable: true,
		JS:        js,
		CSS:       css,
		Colour:    "#131313",
	})

	app.Bind(&flat)
	app.Run()
}
