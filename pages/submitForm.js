import {
    List,
    ListItem,
    Typography,
    TextField,
    Button,
  } from '@material-ui/core';
  import { useRouter } from 'next/router';
  import axios from 'axios';
  import React, { useContext, useEffect, useState } from 'react';
  import Layout from '../components/Layout';
  import { Store } from '../utils/Store';
  import useStyles from '../utils/styles';
  import Cookies from 'js-cookie';
  import { useSnackbar } from 'notistack';
  import { Controller, useForm } from 'react-hook-form';
  import CheckoutWizard from '../components/CheckoutWizard';
  import { getError } from '../utils/error';

  export default function Coursing() {
    const {
      handleSubmit,
      control,
      formState: { errors },
      setValue,
    } = useForm();
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const {
      userInfo,
      cart: { matchingAddress },
    } = state;
    useEffect(() => { // side effect: เมื่อเรียก component ครั้งแรก 
      if (!userInfo) {
        router.push('/login?redirect=/submitForm');
      }
      setValue('fullName', matchingAddress.fullName);
      setValue('address', matchingAddress.address);
      setValue('city', matchingAddress.city);
      setValue('postalCode', matchingAddress.postalCode);
      setValue('country', matchingAddress.country);
    }, []);
    const { closeSnackbar, enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const submitHandler = async({ courseName, category, section, description, playlist, assignment }) => {
      // dispatch({
      //   type: 'SAVE_MATCHING_ADDRESS',
      //   payload: { fullName, address, city, postalCode, country },
      // });
      // Cookies.set('matchingAddress', {
      //   fullName,
      //   address,
      //   city,
      //   postalCode,
      //   country,
      // });
      console.log('from form >>>>>', courseName)
      // Todo post
      try {
        setLoading(true);
        const { data } = await axios.post(
          '/api/courses',
          {
            courseName,
            category,
            section,
            description,
            playlist,
            assignment,
          },
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
  
        setLoading(false);
        router.push(`/course/${data._id}`);

      } catch (err) {
        setLoading(false);
        enqueueSnackbar(getError(err), { variant: 'error' });
      }

      //router.push('/pick-detail-status');
      
    };
    return (
      <Layout title="Matching Address">
        <CheckoutWizard activeStep={1} />
        <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
          <Typography component="h1" variant="h1">
            assignment Info
          </Typography>
          <List>
            <ListItem>
              <Controller
                name="courseName"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="courseName"
                    label="Course Name"
                    error={Boolean(errors.courseName)}
                    helperText={
                      errors.courseName
                        ? errors.courseName.type === 'minLength'
                          ? 'Course Name length is more than 1'
                          : 'Course Name is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="category"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="category"
                    label="Course Category"
                    error={Boolean(errors.category)}
                    helperText={
                      errors.category
                        ? errors.category.type === 'minLength'
                          ? 'Category length is more than 1'
                          : 'Category is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="section"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="section"
                    label="Section"
                    error={Boolean(errors.section)}
                    helperText={
                      errors.section
                        ? errors.section.type === 'minLength'
                          ? 'Section length is more than 1'
                          : 'Section is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="description"
                    label="Description"
                    error={Boolean(errors.description)}
                    helperText={
                      errors.description
                        ? errors.description.type === 'minLength'
                          ? 'Description Code length is more than 1'
                          : 'Description Code is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="playlist"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 1,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="playlist"
                    label="Playlist"
                    error={Boolean(errors.country)}
                    helperText={
                      errors.playlist
                        ? errors.playlist.type === 'minLength'
                          ? 'Playlist length is more than 1'
                          : 'Playlist is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="assignment"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="assignment"
                    label="Assignment"
                    error={Boolean(errors.assignment)}
                    helperText={
                      errors.assignment
                        ? errors.assignment.type === 'minLength'
                          ? 'Assignment length is more than 1'
                          : 'Assignment is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Button variant="contained" type="submit" fullWidth color="primary">
                Continue
              </Button>
            </ListItem>
          </List>
        </form>
      </Layout>
    );
  }