package main

import (
	"encoding/json"

	_ "github.com/mattn/go-sqlite3"
	"github.com/wailsapp/wails"
)

type Flat struct {
	runtime *wails.Runtime
	log     *wails.CustomLogger
	db      map[string][]string
}

// func NewFlat() (*Flat, error) {
// 	db, err := sql.Open("sqlite3", "./foo.db")
// 	if
// }

func (f *Flat) Append(req string) ([]string, error) {
	var r struct {
		ID      string
		Refs    []string
		Content string
	}
	err := json.Unmarshal([]byte(req), &r)
	if err != nil {
		return nil, err
	}
	return r.Refs, nil
}

func (f *Flat) WailsInit(runtime *wails.Runtime) error {
	f.runtime = runtime
	f.log = runtime.Log.New("Flat")
	f.log.Info("Here")

	return nil
}
