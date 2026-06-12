"use client";

import React, { useState, useRef } from "react";
import { Form, Fieldset, TextField, Label, Input, TextArea, Select, ListBox, Button, FieldError } from "@heroui/react";
import {  Globe, ArrowUpToLine, Check, Xmark, Factory, Pencil } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { createCompany } from "@/lib/actions/companies";

// --- Hero UI Custom Blue Theme Tailwind Classes ---
const textInputClass = "w-full bg-gray-900 text-white placeholder-zinc-500 rounded-lg border border-transparent focus:border-sky-500 px-4 py-3 outline-none transition-all text-sm";
const textAreaClass = "w-full bg-gray-900 text-white placeholder-zinc-500 rounded-lg border border-transparent focus:border-sky-500 p-4 outline-none transition-all text-sm resize-none";
const triggerClasses = "w-full bg-gray-900 text-white rounded-lg px-4 py-3 border border-transparent focus:border-sky-500 flex justify-between items-center text-sm";
const popoverClasses = "bg-gray-900 border border-zinc-800 rounded-lg shadow-xl p-1 min-w-[200px]";
const listItemClasses = "text-zinc-300 hover:text-white hover:bg-sky-600 px-3 py-2 rounded-md cursor-pointer transition-colors text-sm outline-none";

export default function CompanyProfile({recruiter, recruiterCompany}) {
  // Application Dynamic Component View States
  const [company, setCompany] = useState(recruiterCompany); // Explicit structure: { name, industry, websiteUrl, location, employeeCount, logo, description, status: 'Pending' | 'Approved' | 'Rejected' }
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [logoPreview, setLogoPreview] = useState("");
  const fileInputRef = useRef(null);

  // Imgbb Client-side Safe Upload Routine
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show instant temporary client preview
    setLogoPreview(URL.createObjectURL(file));
    setIsUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      // Replace with public environment variable token configuration safely inside application setups
      const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API; 
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      
      if (data.success) {
        setLogoPreview(data.data.url);
      } else {
        setErrors((prev) => ({ ...prev, logo: "Upload failed. Please try again." }));
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, logo: "Network error occurred updating asset profile image." }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    
    // Client-side Validation Schema Mapping
    const newErrors = {};
    if (!data.companyName) newErrors.companyName = "Company Name is required";
    if (!data.industry) newErrors.industry = "Industry/Category is required";
    if (!data.websiteUrl) newErrors.websiteUrl = "Website URL is required";
    if (!data.location) newErrors.location = "Location coordinates required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    
    // Construct database schema data structure safely payloads
    const newCompanyData = {
      name: data.companyName,
      industry: data.industry,
      websiteUrl: data.websiteUrl.startsWith("http") ? data.websiteUrl : `https://${data.websiteUrl}`,
      location: data.location,
      employeeCount: data.employeeCount || "1-10 employees",
      description: data.description,
      logo: logoPreview || "/placeholder-logo.png",
      status: company?.status || "Pending", // Retain current admin-set state verification checks
      recruiterId: recruiter.id
    };
    const updatedProfile =(newCompanyData) ;

    // console.log('Submitted company profile data:', newCompanyData);
    const payload = await createCompany(newCompanyData);

    if (payload.insertedId) {
      toast.success("Company profile created successfully !")
    }
    

    // Simulated Sync Process updating internal tracking configurations 
    setCompany(updatedProfile);
    setIsEditing(false);
  };

  // Status Badge Styling Function mapping matching criteria structures
  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Rejected": return "bg-danger-500/10 text-danger-400 border-danger-500/20";
      default: return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }
  };

  // SCREEN CASE 1: No Registered Profile Instance Found
  if (!company && !isEditing) {
    return (
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center text-center p-12 border border-zinc-900 rounded-2xl bg-black min-h-[400px]">
        <div className="p-4 bg-gray-900 rounded-full text-sky-400 mb-4">
          <Factory size={32} />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No Company Registered</h3>
        <p className="text-zinc-400 max-w-sm mb-6 text-sm">
          You haven't setup a company account framework yet. Create an ecosystem profile instance below to begin tracking open positions.
        </p>
        <Button 
          onClick={() => setIsEditing(true)}
          className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 h-11 transition-colors"
        >
          Register Company
        </Button>
      </div>
    );
  }

  // SCREEN CASE 2: View Existing Profile Metrics State Flow
  if (company && !isEditing) {
    return (
      <div className="w-full bg-black border border-zinc-900 rounded-2xl p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
          <div className="flex items-center gap-4">
            <img 
              src={company.logo} 
              alt={company.name} 
              className="w-16 h-16 rounded-xl object-cover bg-gray-900 border border-zinc-800"
            />
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-white">{company.name}</h2>
                <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusStyle(company.status)}`}>
                  {company.status}
                </span>
              </div>
              <p className="text-sky-400 text-sm flex items-center gap-1.5 mt-1">
                <Globe size={14} />
                <a href={company.websiteUrl} target="_blank" rel="noreferrer" className="hover:underline">{company.websiteUrl}</a>
              </p>
            </div>
          </div>
          
          <Button
            onClick={() => {
              setLogoPreview(company.logo);
              setIsEditing(true);
            }}
            variant="bordered"
            className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 rounded-lg px-4 font-medium h-10 flex items-center gap-2 self-start sm:self-center"
          >
            <Pencil size={16} />
            Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <span className="text-zinc-500 block mb-1">Industry / Category</span>
            <span className="text-zinc-200 font-medium">{company.industry}</span>
          </div>
          <div>
            <span className="text-zinc-500 block mb-1">Location Location</span>
            <span className="text-zinc-200 font-medium">{company.location}</span>
          </div>
          <div>
            <span className="text-zinc-500 block mb-1">Employee Count Range</span>
            <span className="text-zinc-200 font-medium">{company.employeeCount}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-900">
          <span className="text-zinc-500 block text-sm mb-2">Brief Description</span>
          <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">{company.description || "No description provided."}</p>
        </div>
      </div>
    );
  }

  // SCREEN CASE 3: Active Creation Form / Modification Sequence
  return (
    <Form onSubmit={handleSubmit} className="w-full bg-black border border-zinc-900 rounded-2xl p-8 space-y-8" validationErrors={errors} validationBehavior="aria">
      <Fieldset className="space-y-6 w-full">
        <div className="flex justify-between items-center border-b border-zinc-900 pb-4 mb-2">
          <legend className="text-xl font-semibold text-white">
            {company ? "Update Company Information" : "Register Company Profile"}
          </legend>
          {company && (
            <button 
              type="button" 
              onClick={() => setIsEditing(false)} 
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <Xmark size={20} />
            </button>
          )}
        </div>

        {/* Form Inputs Grid layout matched with visual wireframes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField name="companyName" defaultValue={company?.name} isInvalid={!!errors.companyName} className="flex flex-col gap-1.5 w-full">
            <Label className="text-zinc-400 font-medium text-sm">Company Name</Label>
            <Input placeholder="e.g. Acme Corp" className={textInputClass} />
            {errors.companyName && <FieldError className="text-xs text-danger mt-1">{errors.companyName}</FieldError>}
          </TextField>

          <Select className="w-full" name="industry" defaultSelectedKeys={[company?.industry || "technology"]} isInvalid={!!errors.industry}>
            <Label className="text-zinc-400 font-medium text-sm mb-1.5 block">Industry / Category</Label>
            <Select.Trigger className={triggerClasses}>
              <Select.Value className="text-white" />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className={popoverClasses}>
              <ListBox className="outline-none">
                <ListBox.Item id="technology" className={listItemClasses} textValue="Technology">Technology</ListBox.Item>
                <ListBox.Item id="design" className={listItemClasses} textValue="Design">Design</ListBox.Item>
                <ListBox.Item id="finance" className={listItemClasses} textValue="Finance">Finance</ListBox.Item>
                <ListBox.Item id="healthcare" className={listItemClasses} textValue="Healthcare">Healthcare</ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField name="websiteUrl" defaultValue={company?.websiteUrl} isInvalid={!!errors.websiteUrl} className="flex flex-col gap-1.5 w-full">
            <Label className="text-zinc-400 font-medium text-sm">Website URL</Label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-zinc-500 text-sm font-medium select-none pointer-events-none">https://</span>
              <Input placeholder="www.company.com" className={`${textInputClass} pl-20`} />
            </div>
            {errors.websiteUrl && <FieldError className="text-xs text-danger mt-1">{errors.websiteUrl}</FieldError>}
          </TextField>

          <TextField name="location" defaultValue={company?.location} isInvalid={!!errors.location} className="flex flex-col gap-1.5 w-full">
            <Label className="text-zinc-400 font-medium text-sm">Location</Label>
            <div className="relative flex items-center">
              <Globe size={16} className="absolute left-4 text-zinc-500 pointer-events-none" />
              <Input placeholder="City, Country" className={`${textInputClass} pl-11`} />
            </div>
            {errors.location && <FieldError className="text-xs text-danger mt-1">{errors.location}</FieldError>}
          </TextField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <Select className="w-full" name="employeeCount" defaultSelectedKeys={[company?.employeeCount || "1-10"]}>
            <Label className="text-zinc-400 font-medium text-sm mb-1.5 block">Employee Count Range</Label>
            <Select.Trigger className={triggerClasses}>
              <Select.Value className="text-white" />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className={popoverClasses}>
              <ListBox className="outline-none">
                <ListBox.Item id="1-10" className={listItemClasses} textValue="1-10 employees">1-10 employees</ListBox.Item>
                <ListBox.Item id="11-50" className={listItemClasses} textValue="11-50 employees">11-50 employees</ListBox.Item>
                <ListBox.Item id="51-200" className={listItemClasses} textValue="51-200 employees">51-200 employees</ListBox.Item>
                <ListBox.Item id="201+" className={listItemClasses} textValue="201+ employees">201+ employees</ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>

          {/* Dedicated Component Drag Layout Matching Provided Mock Image */}
          <div className="flex flex-col gap-1.5 w-full">
            <span className="text-zinc-400 font-medium text-sm block">Company Logo</span>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleLogoUpload} 
              accept="image/png, image/jpeg" 
              className="hidden" 
            />
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-4 bg-gray-900 border border-dashed border-sky-500/30 hover:border-sky-500 rounded-xl p-4 cursor-pointer transition-all h-[50px] w-full group"
            >
              <div className="bg-sky-500/10 text-sky-400 p-2 rounded-lg group-hover:bg-sky-500 group-hover:text-black transition-colors">
                <ArrowUpToLine size={16} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-white text-sm font-medium">
                  {isUploading ? "Uploading image asset..." : "Upload image"}
                </span>
                <span className="text-xs text-zinc-500">PNG, JPG up to 5MB</span>
              </div>
              {logoPreview && (
                <img src={logoPreview} alt="Preview" className="w-8 h-8 rounded-md object-cover ml-auto border border-zinc-700" />
              )}
            </div>
            {errors.logo && <span className="text-xs text-danger mt-1">{errors.logo}</span>}
          </div>
        </div>

        <TextField name="description" defaultValue={company?.description} className="flex flex-col gap-1.5 w-full">
          <Label className="text-zinc-400 font-medium text-sm">Brief Description</Label>
          <TextArea
            placeholder="Tell us about your company's mission and culture..."
            rows={4}
            className={textAreaClass}
          />
        </TextField>
      </Fieldset>

      {/* Action Tray Footer Form Controls */}
      <div className="flex justify-end gap-3 pt-4 border-t border-zinc-900 w-full">
        {company && (
          <Button
            type="button"
            variant="bordered"
            onClick={() => setIsEditing(false)}
            className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 rounded-lg px-6 font-medium h-11"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isUploading}
          className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 transition-colors h-11 disabled:opacity-50"
        >
          {company ? "Save Profiles Changes" : "Save and Submit Profile"}
        </Button>
      </div>
    </Form>
  );
}