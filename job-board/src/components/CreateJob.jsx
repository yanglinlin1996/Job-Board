import React, { Fragment } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
    Paper,
    Box,
    Grid,
    TextField,
    Typography,
    Button
  } from '@material-ui/core';
  
  const CreateJob = () => {
    
    const validationSchema = Yup.object().shape({
        jobtitle: Yup.string().required('Job title is required'),
        companyname: Yup.string()
          .required('Company name is required'),
        location: Yup.string()
          .required('Location is required'),
        description: Yup.string()
          .required('Description is required'),
        email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
        website: Yup.string()
      });

    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = data => {
        // console.log(JSON.stringify(data, null, 2));
        // event.preventDefault();
        const dataFromUser = JSON.stringify(data, null, 2);
        const jobData = {
            title: dataFromUser.jobtitle,
            companyName: dataFromUser.companyname,
            location: dataFromUser.location,
            description: dataFromUser.description,
            employerEmailContact: dataFromUser.email,
            companyWebsite: dataFromUser.website
        };

        const opt = {
            method: "POST",
            url: "http://localhost:8000/api/job/create",
            data: jobData,
            headers: { "content-type": "application/json" },
            // withCredentials: true
        };

        axios(opt)
            .then(response => { 
                if (response.status === 200) {
                    console.log("Create job response is: ", response);
                    // handleLoggedIn(response.data);
                    // navigate('/');
                }
            })
            .catch(error => console.log("Create job failed: ", error.message));
    };

    return (
      <Fragment>
        <Paper>
          <Box px={3} py={2}>
            <Typography variant="h6" align="center" margin="dense">
              Create A New Job
            </Typography>

            <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id=""
                name="jobtitle"
                label="Job Title"
                fullWidth
                margin="dense"
                {...register('jobtitle')}
                error={errors.jobtitle ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.jobtitle?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="companyname"
                name="companyname"
                label="Company Name"
                fullWidth
                margin="dense"
                {...register('companyname')}
                error={errors.companyname ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.companyname?.message}
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="location"
                name="location"
                label="Location"
                type="location"
                fullWidth
                margin="dense"
                {...register('location')}
                error={errors.location ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.location?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="description"
                name="description"
                label="Description"
                type="description"
                fullWidth
                margin="dense"
                {...register('description')}
                error={errors.description ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.description?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                margin="dense"
                {...register('email')}
                error={errors.email ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.email?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                
                id="website"
                name="website"
                label="Website (optional)"
                fullWidth
                margin="dense"
                {...register('website')}
                error={errors.website ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.website?.message}
              </Typography>
            </Grid>
          </Grid>

          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>
    </Fragment>
  );
};

export default CreateJob;