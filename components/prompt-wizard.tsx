"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreatableSelectComponent } from "@/components/ui/creatable-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, Info, Home, Box, Users, Grid } from "lucide-react";
import {
  templates,
  getTemplateSteps,
  templateDescriptions,
  validateStepFields,
  appendExtraInstructions,
  appendReferenceIntent,
  getTemplateName,
} from "@/lib/prompt-wizard-config";
import type { Field } from "@/lib/prompt-wizard-config";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TemplateType =
  | "product-in-environment"
  | "styled-product"
  | "product-with-person"
  | "flat-lay";

interface FormValues {
  template: TemplateType;
  productName: string;
  orientation: "portrait" | "landscape";
  referenceIntent: string;
  // Product in Environment
  productType?: string;
  surfaceType?: string;
  location?: string;
  moodStyle?: string;
  lightingStyle?: string;
  decor1?: string;
  decor2?: string;
  colorTexture?: string;
  positioning?: string;
  // Styled Product
  productDescription?: string;
  shootingStyle?: string;
  // Product with Person
  personType?: string;
  moodVibe?: string;
  productFunction?: string;
  // Flat-Lay Bundle
  bundleCount?: string;
  propItem?: string;
  colorPalette?: string;
  // Extra Instructions
  extraInstructions?: string;
}

interface PromptWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onPromptGenerated: (prompt: string) => void;
}

export default function PromptWizard({
  isOpen,
  onClose,
  onPromptGenerated,
}: PromptWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [values, setValues] = useState<FormValues>({
    template: "product-in-environment",
    productName: "",
    orientation: "portrait",
    referenceIntent: "none",
  });

  const steps = getTemplateSteps(values.template);
  const currentStepData = steps.find((step) => step.step === currentStep);
  const isStepValid = currentStepData
    ? validateStepFields(currentStepData, values)
    : false;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      generatePrompt();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generatePrompt = () => {
    const basePrompt = templates[values.template].generatePrompt(values);
    const prompt = appendReferenceIntent(basePrompt, values.referenceIntent);
    const finalPrompt = appendExtraInstructions(
      prompt,
      values.extraInstructions
    );
    onPromptGenerated(finalPrompt);
    onClose();
  };

  const renderField = (field: Field) => {
    const value = values[field.name as keyof FormValues] || "";
    const handleChange = (newValue: string) => {
      setValues({ ...values, [field.name]: newValue });
    };

    switch (field.type) {
      case "text":
        return (
          <Input
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            className="mt-1"
          />
        );
      case "textarea":
        return (
          <Textarea
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            className="mt-1"
            rows={field.rows || 4}
          />
        );
      case "creatable-select":
        return (
          <CreatableSelectComponent
            options={field.options}
            value={value}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="mt-1"
          />
        );
      case "dropdown":
        return (
          <Select value={value} onValueChange={handleChange}>
            <SelectTrigger className="mt-1">
              <SelectValue
                placeholder={`Select ${field.label.toLowerCase()}`}
              />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "radio":
        return (
          <RadioGroup
            value={value}
            onValueChange={handleChange}
            className="flex gap-4 mt-2"
          >
            {field.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        );
    }
  };

  const renderFields = (fields: Field[]) => {
    return (
      <div className="space-y-6">
        {fields.map((field) => (
          <div key={field.name}>
            <div className="flex items-center gap-2">
              <Label>{field.label}</Label>
              {field.tooltip && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-black text-white">
                      <p className="max-w-[200px] text-sm">{field.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {field.optional && (
                <span className="text-sm text-gray-500">(Optional)</span>
              )}
            </div>
            {renderField(field)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col overflow-hidden p-4 sm:p-6">
        <DialogHeader className="pb-2 sm:pb-4 flex-shrink-0">
          <DialogTitle className="text-xl sm:text-2xl font-semibold">
            Prompt Wizard
          </DialogTitle>
        </DialogHeader>

        {/* Modern Stepper */}
        <div className="mb-4 sm:mb-8 flex-shrink-0">
          <div className="flex items-center justify-between relative px-2">
            {/* Progress Bar */}
            <div
              className="absolute h-1 bg-gray-200 top-4 sm:top-5 left-0 right-0"
              style={{ zIndex: 0 }}
            />
            <div
              className="absolute h-1 bg-indigo-600 top-4 sm:top-5 left-0 transition-all duration-300"
              style={{
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                zIndex: 0,
              }}
            />

            {/* Steps */}
            {steps.map((step) => (
              <div
                key={step.step}
                className="relative flex flex-col items-center flex-1"
                style={{ zIndex: 1 }}
              >
                <div
                  className={`
                    flex items-center justify-center w-7 h-7 sm:w-10 sm:h-10 rounded-full 
                    ${
                      step.step <= currentStep
                        ? "bg-indigo-600 text-white"
                        : "bg-white border-2 border-gray-200 text-gray-400"
                    }
                    transition-all duration-200
                  `}
                >
                  {step.step < currentStep ? (
                    <Check className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                  ) : (
                    <span className="text-xs sm:text-sm font-medium">
                      {step.step}
                    </span>
                  )}
                </div>
                <div className="mt-2 text-center w-full px-1">
                  <div
                    className={`text-[11px] leading-tight sm:text-sm font-medium ${
                      step.step <= currentStep
                        ? "text-indigo-600"
                        : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </div>
                  {step.description && (
                    <div className="hidden sm:block text-xs text-gray-400">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Area with Scroll */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
            {currentStepData && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {currentStepData.title}
                </h3>
                {currentStepData.description && (
                  <p className="text-sm text-gray-500">
                    {currentStepData.description}
                  </p>
                )}
                {currentStep === 1 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {(Object.keys(templates) as TemplateType[]).map(
                      (templateType) => (
                        <TooltipProvider key={templateType}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() =>
                                  setValues({
                                    ...values,
                                    template: templateType,
                                  })
                                }
                                className={`
                                w-full p-4 rounded-lg border-2 transition-all duration-200
                                ${
                                  values.template === templateType
                                    ? "border-indigo-600 bg-indigo-50"
                                    : "border-gray-200 hover:border-indigo-200"
                                }
                              `}
                              >
                                <div className="text-left">
                                  <div className="flex items-center gap-2">
                                    {getTemplateIcon(templateType)}
                                    <div className="font-medium">
                                      {getTemplateName(templateType)}
                                    </div>
                                  </div>
                                  <div className="text-sm text-gray-500 mt-2">
                                    {templateDescriptions[templateType].short}
                                  </div>
                                </div>
                              </button>
                            </TooltipTrigger>
                            <TooltipContent
                              side="top"
                              align="center"
                              sideOffset={5}
                              className="bg-black text-white w-[250px] p-3"
                            >
                              <p className="text-sm leading-relaxed">
                                {templateDescriptions[templateType].detailed}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )
                    )}
                  </div>
                ) : (
                  renderFields(currentStepData.fields)
                )}
              </div>
            )}
          </div>
        </div>

        {/* Navigation - Fixed at Bottom */}
        <div className="flex justify-between pt-4 mt-4 border-t flex-shrink-0">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-6"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isStepValid}
            className="px-6 bg-indigo-600 hover:bg-indigo-700"
          >
            {currentStep === steps.length ? "Generate Prompt" : "Next"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getTemplateIcon(templateType: TemplateType) {
  switch (templateType) {
    case "product-in-environment":
      return <Home className="w-6 h-6 mb-2 text-indigo-600" />;
    case "styled-product":
      return <Box className="w-6 h-6 mb-2 text-indigo-600" />;
    case "product-with-person":
      return <Users className="w-6 h-6 mb-2 text-indigo-600" />;
    case "flat-lay":
      return <Grid className="w-6 h-6 mb-2 text-indigo-600" />;
    default:
      return null;
  }
}
