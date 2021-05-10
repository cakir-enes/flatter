package wm

type Rect struct {
	X int
	Y int
	W int
	H int
}

type Window struct {
	id    string
	title string
	rect  Rect
}

type Container struct {
	ID      string
	windows []*Window
}

type Snapshot []*Window

type ShittyWM struct {
	containers []Container
}

func Fix(snapshot Snapshot) *ShittyWM {
	return &ShittyWM{}
}

func (s *ShittyWM) position(snapshot []*Window) *ShittyWM {

	return s
}

// snapshot().Position().Resize().Run()
