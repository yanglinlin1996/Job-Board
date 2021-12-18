import React, { Fragment } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
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
  import { STYLE } from '../constants.js'; 
  
  const CreateJob = () => {
    
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Job title is required'),
        companyName: Yup.string()
          .required('Company name is required'),
        location: Yup.string()
          .required('Location is required'),
        description: Yup.string()
          .required('Description is required'),
        employerEmailContact: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
        companyWebsite: Yup.string()
      });

    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm({ resolver: yupResolver(validationSchema)});

    const navigate = useNavigate();

    const onSubmit = data => {
        const opt = {
            method: "POST",
            url: "/api/job/create",
            data: data,
            headers: { "content-type": "application/json" },
        };

        axios(opt)
            .then(response => { 
                if (response.status === 200) {
                    alert("Job created successfully");
                    navigate(`/jobDetails/${response.data.id}/${0}`);
                }
            })
            .catch(() => navigate('/'));
    };

    return (
      <div class="content">
      <Fragment>
        <Paper>
          <Box px={3} py={2}>
            <Typography variant="h6" align="center" margin="dense">
              <h2>Create A New Job</h2>
            </Typography>

            <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="title"
                name="title"
                label="Job Title"
                fullWidth
                margin="dense"
                {...register('title')}
                error={errors.jobtitle ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.title?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="companyName"
                name="companyName"
                label="Company Name"
                fullWidth
                margin="dense"
                {...register('companyName')}
                error={errors.companyName ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.companyName?.message}
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
                id="employerEmailContact"
                name="employerEmailContact"
                label="Email"
                fullWidth
                margin="dense"
                {...register('employerEmailContact')}
                error={errors.employerEmailContact ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.employerEmailContact?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                
                id="companyWebsite"
                name="companyWebsite"
                label="Website (optional)"
                fullWidth
                margin="dense"
                {...register('companyWebsite')}
                error={errors.companyWebsite ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.companyWebsite?.message}
              </Typography>
            </Grid>
          </Grid>

          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              style={STYLE}>
              Submit
            </Button>
            
          </Box>
        </Box>
      </Paper>
    </Fragment>
    </div>
  );
};

export default CreateJob;