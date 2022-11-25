import { Link } from 'react-router-dom';
import axios from 'axios';



import { Component} from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import Paper from '@mui/material/Paper';
import { positions } from '@mui/system';
import { styled } from '@mui/material/styles';

// const router = require('express').Router();
// let Menu_Item = require('../models/menu_item.mode   ');

// router.route('/:id').get((req,res) => {
//     Menu_Item.findById(req.params.id)
//         .then(menuItem => res.json(menuItem))
//         .catch(err => res.status(400).json('Error: ' + err));
// });



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }));

export default class MenuItem extends Component {

    constructor(props) {
        super(props);
        this.state =
        {
            id: -1
        }
    }


    displayItem(props) {
        var id = props;
    }


    render(){
        // return (
        // //  <Button variant="contained">
        // //     "Hello World"
        // //     sx={
        // //     {borderRadius: 50}
        // //     }
        // //  </Button>
        // <Box
        //     sx={{
        //         // p: 3,
        //         // borderRadius: 0,
        //         border: '1px dashed grey',
        //         mx: (5,5),
        //         // position: top,
        //         // mt: 5
                
        //         }}>
        //     <Button
        //     sx={{
        //         // p: 10,
        //         // borderRadius: 3,
        //         border: '1px solid grey',
        //         // display: 'inline',
        //         // position: top,
        //         // mr: 0,
        //         // mr: 50,
        //         // ml: 5,
        //         mx: (80,0),
        //         // mt: 0,
        //         // pt: 5,
        //         // mb: 10
                
        //         }}
            
        //     >Sign In
        //     </Button>
        //     <Button
        //     sx={{
        //         // p: 10,
        //         // borderRadius: 3,
        //         border: '1px solid grey',
        //         mx: (0,0),
        //         // display: 'inline',
        //         // position: top,
        //         // mr: 0,
        //         // mr: 50,
        //         // pr: 5,
        //         // ml: 170,
        //         // mt: 0,
        //         // pt: 5,
        //         // mb: 10
        //         }}
        //     >Create Account
        //     </Button>
        // </Box>
        // );
        const test = true;
        return (
            <>
            {/* <Stack
                direction={{ xs: 'column', sm: 'row' }}
                // spacing={{ xs: 1, sm: 2, md: 4 }}
                justifyContent="flex-end"
                spacing={1}
                sx={{mr: 3}}
            >
                <Button
                    sx = {{border: 3}}
                    >Sign In
                </Button>

                <Button
                    sx = {{border: 3}}
                    >Create Account
                </Button>
            </Stack> */}

            <Stack
                direction='row'
                // spacing={{ xs: 1, sm: 2, md: 4 }}
                justifyContent="flex-start"
            >
            <div>
                <h1>
                {"Menu Item Name"}
                </h1>
            </div>
            </Stack>

            <Stack
                sx={{
                    mr: 10,
                    p: 5,
                    border: 2,
                    ml: 10
                    // borderLeft: 20
                }}
                direction='row'
                alignItems='center'
                spacing='20'
                justifyContent="center"
            >
                <Stack //vert stack
                sx={{
                    mr: 10,
                    // p: 20,
                    width: 800,
                    p: 5,
                    border: 2,
                    ml: 10
                    // borderLeft: 20
                }}
                    direction='column'
                    // spacing={{ xs: 1, sm: 2, md: 4 }}
                    justifyContent="center"
                    alignItems="center"
                    marginRight='50'
                    spacing={3}
                >
                    <Item
                    sx={{
                            p: 2,
                            border: 2,
                            borderColor: '1px solid black',                                    
                            }}>
                        <body>
                        {"Ingredients"}
                        </body>
                    </Item>

                    <Item
                    sx={{
                            p: 2,
                            border: 2,
                            borderColor: '1px solid black',                                    
                            }}>
                        <body>
                        {"Allergens"}
                        </body>
                    </Item>
                </Stack>

                <Stack //vert stack
                sx={{
                    mr: 10,
                    p: 5,
                    border: 2,
                    ml: 130
                    // borderLeft: 20
                }}
                    direction='column'
                    // spacing={{ xs: 1, sm: 2, md: 4 }}
                    justifyContent="center"
                    alignItems="center"
                    marginRight='50'
                    spacing={3}
                >
                    <Stack
                        direction='row'
                        spacing={2}
                        >
                        <Item
                            sx={{
                                    p: 2,
                                    border: 2,
                                    borderColor: '1px solid black',                                    
                                    }}>
                                <body>
                                {"Rating: 5/5"}
                                </body>
                        </Item>
                        <Button variant="outlined">Rate</Button>
                    </Stack>

                    <Stack
                        direction='row'
                        spacing={2}
                        >
                    <Item
                    sx={{
                            p: 2,
                            border: 2,
                            borderColor: '1px solid black',                                    
                            }}>
                        <body>
                        {"Review 1"}
                        </body>
                        <body>
                        {"Review 2"}
                        </body>
                    </Item>
                    <Button variant="outlined">Review</Button>
                    </Stack>
                </Stack>
            </Stack>
              {/* <Button
                sx={[
                  {
                    width: {
                      xs: 100, // theme.breakpoints.up('xs')
                      sm: 200, // theme.breakpoints.up('sm')
                      md: 300, // theme.breakpoints.up('md')
                      lg: 400, // theme.breakpoints.up('lg')
                      xl: 500 // theme.breakpoints.up('xl')
                    },
                    m: 4,
                    border: 5,
                    borderColor: "secondary.main",
                    "&.MuiButton-root": {
                      height: "100px"
                    }
                  },
                  test && {
                    border: 10,
                    borderColor: "primary.main"
                  }
                ]}
                variant="contained"
              >
                Button 1
              </Button>
              <Button variant="outlined">Button 2</Button> */}
            </>
          );
    }
}

// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// function ContainerExample() {
//   return (
//     <Container>
//       <Row>
//         <Col>1 of 1</Col>
//       </Row>
//     </Container>
//   );
// }

// export default ContainerExample;