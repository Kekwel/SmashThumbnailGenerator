const layouts = [
    {
        'name': 'Par défaut',
        'layout': {
            "j1": {
                "player": "j1",
                "tag": {
                    "index": 1,
                    "angle": 0,
                    "text": {
                        "value": "Joueur X",
                        "x": 0,
                        "y": 20,
                        "fontSize": 40,
                        "fill": "#000000",
                        "font": "Futura Bold",
                        "fontWeight": "normal",
                        "fontStyle": "normal",
                        "alignmentX": "center",
                        "alignmentY": "middle"
                    },
                    "bg": {
                        "width": 640,
                        "height": 75,
                        "x": -320,
                        "y": -37.5,
                        "gradient": {
                            "colors": [{
                                "id": 0,
                                "hex": "#ffffff"
                            }, {
                                "id": 1,
                                "hex": "#ffffff"
                            }],
                            "origin": {
                                "x": 0,
                                "y": 0
                            },
                            "dest": {
                                "x": 640,
                                "y": 75
                            }
                        },
                        "scale": {
                            "x": 1,
                            "y": 1
                        }
                    }
                },
                "bg": {
                    "width": 640,
                    "height": 720,
                    "x": 0,
                    "y": 0
                },
                "characters": {
                    "index": -4,
                    "x": -10,
                    "y": 85,
                    "width": 650,
                    "height": 655,
                    "flipX": false,
                    "angle": 0,
                    "scale": {
                        "x": 1,
                        "y": 1
                    },
                    "character": {},
                    "shadow": {
                        "active": true,
                        "x": -10,
                        "y": 10,
                        "blur": 0,
                        "color": "#000000"
                    }
                }
            },
            "j2": {
                "player": "j2",
                "tag": {
                    "index": 1,
                    "angle": 0,
                    "text": {
                        "value": "Joueur Y",
                        "x": 640,
                        "y": 20,
                        "fontSize": 40,
                        "fill": "#000000",
                        "font": "Futura Bold",
                        "fontWeight": "normal",
                        "fontStyle": "normal",
                        "alignmentX": "center",
                        "alignmentY": "middle"
                    },
                    "bg": {
                        "width": 640,
                        "height": 75,
                        "x": -320,
                        "y": -37.5,
                        "gradient": {
                            "colors": [{
                                "id": 0,
                                "hex": "#ffffff"
                            }, {
                                "id": 1,
                                "hex": "#ffffff"
                            }],
                            "origin": {
                                "x": 0,
                                "y": 0
                            },
                            "dest": {
                                "x": 640,
                                "y": 75
                            }
                        },
                        "scale": {
                            "x": 1,
                            "y": 1
                        }
                    }
                },
                "bg": {
                    "width": 640,
                    "height": 720,
                    "x": 640,
                    "y": 0
                },
                "characters": {
                    "index": -4,
                    "x": 630,
                    "y": 85,
                    "width": 650,
                    "height": 655,
                    "flipX": false,
                    "angle": 0,
                    "scale": {
                        "x": 1,
                        "y": 1
                    },
                    "character": {},
                    "shadow": {
                        "active": true,
                        "x": -10,
                        "y": 10,
                        "blur": 0,
                        "color": "#000000"
                    }
                }
            },
            "phase1": {
                "index": 1,
                "angle": 0,
                "text": {
                    "value": "Winners",
                    "x": 0,
                    "y": 605,
                    "fontSize": 40,
                    "fill": "#000000",
                    "font": "Futura Bold",
                    "fontWeight": "normal",
                    "fontStyle": "normal",
                    "alignmentX": "center",
                    "alignmentY": "middle"
                },
                "bg": {
                    "width": 640,
                    "height": 75,
                    "x": -320,
                    "y": -37.5,
                    "gradient": {
                        "colors": [{
                            "id": 0,
                            "hex": "#ffffff"
                        }, {
                            "id": 1,
                            "hex": "#ffffff"
                        }],
                        "origin": {
                            "x": 0,
                            "y": 0
                        },
                        "dest": {
                            "x": 640,
                            "y": 75
                        }
                    },
                    "scale": {
                        "x": 1,
                        "y": 1
                    }
                }
            },
            "phase2": {
                "index": 1,
                "angle": 0,
                "text": {
                    "value": "Round 1",
                    "x": 640,
                    "y": 605,
                    "fontSize": 40,
                    "fill": "#000000",
                    "font": "Futura Bold",
                    "fontWeight": "normal",
                    "fontStyle": "normal",
                    "alignmentX": "center",
                    "alignmentY": "middle"
                },
                "bg": {
                    "width": 640,
                    "height": 75,
                    "x": -320,
                    "y": -37.5,
                    "gradient": {
                        "colors": [{
                            "id": 0,
                            "hex": "#ffffff"
                        }, {
                            "id": 1,
                            "hex": "#ffffff"
                        }],
                        "origin": {
                            "x": 0,
                            "y": 0
                        },
                        "dest": {
                            "x": 640,
                            "y": 75
                        }
                    },
                    "scale": {
                        "x": 1,
                        "y": 1
                    }
                }
            },
            "vs": {
                "index": 1,
                "scale": {
                    "x": 1,
                    "y": 1
                },
                "width": 136.32299697875976,
                "height": 111.86999999999999,
                "angle": 0,
                "text": {
                    "value": "VS",
                    "x": 564.954345703125,
                    "y": 305.565,
                    "fontSize": 99,
                    "fill": "#000000",
                    "font": "Futura Bold",
                    "fontWeight": "bold",
                    "fontStyle": "italic",
                    "alignmentX": "center",
                    "alignmentY": "middle"
                },
                "shadow": {
                    "color": "#ffffff",
                    "blur": 0,
                    "offsetX": 5,
                    "offsetY": 5,
                    "opacity": 1
                }
            }
        }
    }, {
        'name': 'Classic 1',
        'layout': {
            "j1":{
                "tag":{
                    "index":1,
                    "angle":5,
                    "text":{
                        "x":0,
                        "y":20,
                        "alignmentX": "center",
                        "alignmentY": "middle"
                    },
                    "bg":{
                        "width":661.8961913989749,
                        "height":75,
                        "x":-320,
                        "y":-37.5,
                        "scale":{
                            "x":1.0342127990608982,
                            "y":1
                        }
                    }
                },
                "bg":{
                    "width":640,
                    "height":720,
                    "x":0,
                    "y":0,
                },
                "characters":{
                    "index":-4,
                    "x":-10,
                    "y":85,
                    "width":650,
                    "height":645,
                    "flipX":false,
                    "angle":0,
                    "scale":{
                        "x":1,
                        "y":1
                    }
                }
            },
            "j2":{
                "tag":{
                    "index":1,
                    "angle":5,
                    "text":{
                        "x":640,
                        "y":20,
                        "alignmentX": "center",
                        "alignmentY": "middle"
                    },
                    "bg":{
                        "width":657.4487184114039,
                        "height":75,
                        "x":-320,
                        "y":-37.5,
                        "scale":{
                            "x":1.0272636225178187,
                            "y":1
                        }
                    }
                },
                "bg":{
                    "width":640,
                    "height":720,
                    "x":640,
                    "y":0,
                },
                "characters":{
                    "index":-4,
                    "x":630,
                    "y":85,
                    "width":650,
                    "height":645,
                    "flipX":false,
                    "angle":0,
                    "scale":{
                        "x":1,
                        "y":1
                    },
                }
            },
            "phase1":{
                "index":1,
                "angle":5,
                "text":{
                    "x":0,
                    "y":580,
                    "alignmentX": "center",
                    "alignmentY": "middle"
                },
                "bg":{
                    "width":661.8961913989749,
                    "height":75,
                    "x":-320,
                    "y":-37.5,
                    "scale":{
                        "x":1.0342127990608982,
                        "y":1
                    }
                }
            },
            "phase2":{
                "index":1,
                "angle":5,
                "text":{
                    "x":640,
                    "y":580,
                    "alignmentX": "center",
                    "alignmentY": "middle"
                },
                "bg":{
                    "width":661.8961913989749,
                    "height":75,
                    "x":-320,
                    "y":-37.5,
                    "scale":{
                        "x":1.0342127990608982,
                        "y":1
                    }
                }
            },
            "vs":{
                "index":1,
                "scale":{
                    "x":1,
                    "y":1
                },
                "width":136.32299697875976,
                "height":111.86999999999999,
                "angle":0,
                "text":{
                    "x":564.954345703125,
                    "y":305.565,
                },
                "shadow": {
                    "color": "#ffffff",
                    "blur": 0,
                    "offsetX": 5,
                    "offsetY": 5,
                    "opacity": 1
                }
            }
        }
    }, {
        'name': 'Classic 2',
        'layout': {
            "j1":{
                "tag":{
                    "index":1,
                    "angle":355,
                    "text":{
                        "x":-20,
                        "y":60,
                        "alignmentX": "center",
                        "alignmentY": "middle"
                    },
                    "bg":{
                        "width":661.8961913989749,
                        "height":75,
                        "x":-320,
                        "y":-37.5,
                        "scale":{
                            "x":1.0342127990608982,
                            "y":1
                        }
                    }
                },
                "bg":{
                    "width":640,
                    "height":720,
                    "x":0,
                    "y":0,
                },
                "characters":{
                    "index":-4,
                    "x":-10,
                    "y":85,
                    "width":650,
                    "height":645,
                    "flipX":false,
                    "angle":0,
                    "scale":{
                        "x":1,
                        "y":1
                    }
                }
            },
            "j2":{
                "tag":{
                    "index":1,
                    "angle":355,
                    "text":{
                        "x":619.9999999999999,
                        "y":60,
                        "alignmentX": "center",
                        "alignmentY": "middle"
                    },
                    "bg":{
                        "width":657.4487184114039,
                        "height":75,
                        "x":-320,
                        "y":-37.5,
                        "scale":{
                            "x":1.0364092980560011,
                            "y":1
                        }
                    }
                },
                "bg":{
                    "width":640,
                    "height":720,
                    "x":640,
                    "y":0,
                },
                "characters":{
                    "index":-4,
                    "x":630,
                    "y":85,
                    "width":650,
                    "height":645,
                    "flipX":false,
                    "angle":0,
                    "scale":{
                        "x":1,
                        "y":1
                    },
                }
            },
            "phase1":{
                "index":1,
                "angle":355,
                "text":{
                    "x":-20,
                    "y":620,
                    "alignmentX": "center",
                    "alignmentY": "middle"
                },
                "bg":{
                    "width":661.8961913989749,
                    "height":75,
                    "x":-320,
                    "y":-37.5,
                    "scale":{
                        "x":1.0342127990608982,
                        "y":1
                    }
                }
            },
            "phase2":{
                "index":1,
                "angle":355,
                "text":{
                    "x":620,
                    "y":620,
                    "alignmentX": "center",
                    "alignmentY": "middle"
                },
                "bg":{
                    "width":661.8961913989749,
                    "height":75,
                    "x":-320,
                    "y":-37.5,
                    "scale":{
                        "x":1.0342127990608982,
                        "y":1
                    }
                }
            },
            "vs":{
                "index":1,
                "scale":{
                    "x":1,
                    "y":1
                },
                "width":136.32299697875976,
                "height":111.86999999999999,
                "angle":0,
                "text":{
                    "x":564.954345703125,
                    "y":305.565,
                },
                "shadow": {
                    "color": "#ffffff",
                    "blur": 0,
                    "offsetX": 5,
                    "offsetY": 5,
                    "opacity": 1
                }
            }
        }
    },
    {
        'name': 'Layout 1 : Test',
        'layout': {
            "j1": {
                "tag": {
                    "angle": 0,
                    "text": {
                        "x": -280,
                        "y": 20,
                        "fontSize": 40,
                        "fill": "#000000",
                        "font": "Futura Bold",
                        "fontWeight": "normal",
                        "fontStyle": "normal",
                        "alignmentX": "right",
                        "alignmentY": "middle"
                    },
                    "bg": {
                        "width": 645,
                        "height": 75,
                        "x": -320,
                        "y": -37.5,
                        "gradient": {
                            "colors": [{
                                "id": 0,
                                "hex": "#ffffff"
                            }, {
                                "id": 1,
                                "hex": "#ffffff"
                            }],
                            "origin": {
                                "x": 0,
                                "y": 0
                            },
                            "dest": {
                                "x": 640,
                                "y": 75
                            }
                        },
                        "scale": {
                            "x": 1.0078125000000002,
                            "y": 1
                        }
                    }
                }
            },
            "j2": {
                "player": "j2",
                "tag": {
                    "angle": 0,
                    "text": {
                        "x": 920,
                        "y": 20,
                        "fontSize": 40,
                        "fill": "#000000",
                        "font": "Futura Bold",
                        "fontWeight": "normal",
                        "fontStyle": "normal",
                        "alignmentX": "left",
                        "alignmentY": "middle"
                    },
                    "bg": {
                        "width": 640,
                        "height": 75,
                        "x": -320,
                        "y": -37.5,
                        "gradient": {
                            "colors": [{
                                "id": 0,
                                "hex": "#ffffff"
                            }, {
                                "id": 1,
                                "hex": "#ffffff"
                            }],
                            "origin": {
                                "x": 0,
                                "y": 0
                            },
                            "dest": {
                                "x": 640,
                                "y": 75
                            }
                        },
                        "scale": {
                            "x": 1,
                            "y": 1
                        }
                    }
                }
            },
            "phase1": {
                "angle": 0,
                "text": {
                    "x": 390,
                    "y": 605,
                    "fontSize": 40,
                    "fill": "#000000",
                    "font": "Futura Bold",
                    "fontWeight": "normal",
                    "fontStyle": "normal",
                    "alignmentX": "center",
                    "alignmentY": "middle"
                },
                "bg": {
                    "width": 251,
                    "height": 75,
                    "x": -320,
                    "y": -37.5,
                    "gradient": {
                        "colors": [{
                            "id": 0,
                            "hex": "#ffffff"
                        }, {
                            "id": 1,
                            "hex": "#ffffff"
                        }],
                        "origin": {
                            "x": 0,
                            "y": 0
                        },
                        "dest": {
                            "x": 640,
                            "y": 75
                        }
                    },
                    "scale": {
                        "x": 0.3921875,
                        "y": 1
                    }
                }
            },
            "phase2": {
                "angle": 0,
                "text": {
                    "x": 640,
                    "y": 605,
                    "fontSize": 40,
                    "fill": "#000000",
                    "font": "Futura Bold",
                    "fontWeight": "normal",
                    "fontStyle": "normal",
                    "alignmentX": "center",
                    "alignmentY": "middle"
                },
                "bg": {
                    "width": 251,
                    "height": 75,
                    "x": -320,
                    "y": -37.5,
                    "gradient": {
                        "colors": [{
                            "id": 0,
                            "hex": "#ffffff"
                        }, {
                            "id": 1,
                            "hex": "#ffffff"
                        }],
                        "origin": {
                            "x": 0,
                            "y": 0
                        },
                        "dest": {
                            "x": 640,
                            "y": 75
                        }
                    },
                    "scale": {
                        "x": 0.3921875,
                        "y": 1
                    }
                }
            }
        }
    }
];

export default {
    LAYOUTS: layouts,
}