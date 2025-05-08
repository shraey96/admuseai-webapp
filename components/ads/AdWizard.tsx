import React, { useState, useEffect } from "react";
import ImageUploader from "@/components/image-uploader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  intentMapping,
  getTemplatesForIntent,
  getTemplateSteps,
  validateStepFields,
  templateDescriptions,
  appendReferenceIntent,
  appendExtraInstructions,
  templates,
  Field,
  Step,
  TemplateType,
} from "@/lib/prompt-wizard-config";
import { useCredits } from "@/context/CreditContext";
import ReviewStep from "./ReviewStep";
import { CREDITS_COUNT } from "@/lib/credits-constants";
import {
  Box,
  Home,
  Users,
  Gift,
  Megaphone,
  Edit,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { BASE_WEBSITE_URL } from "@/lib/constants";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

// At the top, add prop type for AdWizard
interface AdWizardProps {
  onSubmit: (values: AdFormPayload) => Promise<void>;
  initialValues?: Partial<AdFormPayload> & { imageUrls?: string[] };
  loading: boolean;
  isNew?: boolean;
}

export type AdFormPayload = {
  name: string;
  prompt: string;
  images: File[];
  brandId?: string;
  numSamples?: number;
  quality?: string;
  adType?: TemplateType;
  dimensions?: string;
};

function getIntentIcon(icon: string) {
  switch (icon) {
    case "Box":
      return <Box className="w-6 h-6 text-indigo-600 mr-2" />;
    case "Home":
      return <Home className="w-6 h-6 text-green-600 mr-2" />;
    case "Users":
      return <Users className="w-6 h-6 text-blue-600 mr-2" />;
    case "Gift":
      return <Gift className="w-6 h-6 text-pink-500 mr-2" />;
    case "Megaphone":
      return <Megaphone className="w-6 h-6 text-orange-500 mr-2" />;
    case "Edit":
      return <Edit className="w-6 h-6 text-purple-600 mr-2" />;
    default:
      return null;
  }
}

function IntentSelection({ onSelect }: { onSelect: (intent: string) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">
          What would you like to create?
        </h2>
        <a
          href={`${BASE_WEBSITE_URL}/prompt-writing-guidelines`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-1"
        >
          Creative Guidelines <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(intentMapping).map(([intent, config]) => (
          <button
            key={intent}
            className="border rounded-lg p-4 text-left hover:shadow-md transition bg-white flex items-center"
            onClick={() => onSelect(intent)}
            type="button"
          >
            {getIntentIcon(config.icon)}
            <div>
              <div className="font-medium text-base mb-1">{intent}</div>
              <div className="text-sm text-muted-foreground">
                {config.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function TemplateSelection({
  intent,
  onSelect,
}: {
  intent: string;
  onSelect: (template: TemplateType) => void;
}) {
  const templates = getTemplatesForIntent(intent);
  const [selected, setSelected] = React.useState<TemplateType | null>(null);
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-2">Choose a template style</h2>
      <div className="flex flex-row gap-4">
        {templates.map((template) => (
          <button
            key={template}
            type="button"
            onClick={() => {
              setSelected(template);
              onSelect(template);
            }}
            className={`flex-1 border rounded-xl bg-white p-4 flex flex-col items-start text-left transition-all duration-200 cursor-pointer hover:shadow-md
              ${
                selected === template
                  ? "border-indigo-600 shadow-lg"
                  : "border-gray-200 hover:border-indigo-300"
              }
            `}
          >
            <div className="font-medium text-base">
              {templateDescriptions[template]?.short || template}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {/* Only show the short description, not detailed/useCases */}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function renderField(field: Field, value: any, onChange: (val: any) => void) {
  // Render label, tooltip, and optional indicator
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium">{field.label}</Label>
        {field.tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span tabIndex={0} className="cursor-pointer">
                  <Info className="h-4 w-4 text-gray-400" />
                </span>
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
      {/* Render the actual field input */}
      {(() => {
        switch (field.type) {
          case "text":
            return (
              <Input
                className="w-full"
                type="text"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder={field.placeholder || ""}
              />
            );
          case "textarea":
            return (
              <Textarea
                className="w-full min-h-[80px]"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder={field.placeholder || ""}
                rows={field.rows || 3}
              />
            );
          case "dropdown":
            return (
              <Select value={value || ""} onValueChange={onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={`Select ${field.label.toLowerCase()}`}
                  />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          case "radio":
            return (
              <RadioGroup
                value={value || ""}
                onValueChange={onChange}
                disabled={field.disabled}
                className="flex gap-4 mt-1"
              >
                {field.options.map((opt) => (
                  <div key={opt.value} className="flex items-center gap-2">
                    <RadioGroupItem
                      value={opt.value}
                      id={`${field.name}-${opt.value}`}
                    />
                    <Label htmlFor={`${field.name}-${opt.value}`}>
                      {opt.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            );
          case "creatable-select":
            return (
              <CreatableSelectComponent
                options={[
                  {
                    label: "Type to add your own custom option",
                    value: "__instruction__",
                    description:
                      "You can select from the list or create your own",
                    isDisabled: true,
                  },
                  ...field.options,
                ]}
                value={value || ""}
                onChange={onChange}
                placeholder={field.placeholder || ""}
              />
            );
          default:
            return null;
        }
      })()}
    </div>
  );
}

function StepContent({
  children,
  footer,
  imagePreviews,
  onImagesChange,
  values,
  setValues,
}: {
  children: React.ReactNode;
  footer?: React.ReactNode;
  imagePreviews: string[];
  onImagesChange: (urls: string[], files: File[]) => void;
  values: Record<string, any>;
  setValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}) {
  return (
    <>
      <div className="mb-6">
        <ImageUploader images={imagePreviews} onImagesChange={onImagesChange} />
      </div>
      <div className="my-6 border-t border-gray-200" />
      <div className="mb-6">
        <div className="flex items-center">
          <Label htmlFor="adName" className="text-sm font-medium mb-1 block">
            Ad Name <span className="text-red-500">*</span>
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-gray-400 ml-1 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent className="bg-black text-white">
                <p>This field is mandatory.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="adName"
          type="text"
          value={values.name || ""}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Enter a name for this ad"
        />
      </div>
      <div className="my-6 border-t border-gray-200" />
      {children}
      {footer && <div className="my-6 border-t border-gray-200" />}
      {footer}
    </>
  );
}

function renderStepFooter({
  handleBack,
  handleNext,
  isStepValid,
  loading,
  showBack = true,
  showNext = true,
  nextLabel = "Next",
  backLabel = "Back",
}: {
  handleBack: () => void;
  handleNext?: () => void;
  isStepValid?: boolean;
  loading?: boolean;
  showBack?: boolean;
  showNext?: boolean;
  nextLabel?: string;
  backLabel?: string;
}) {
  return (
    <div className="flex justify-between mt-8">
      {showBack ? (
        <Button
          variant="outline"
          type="button"
          onClick={handleBack}
          disabled={loading}
        >
          {backLabel}
        </Button>
      ) : (
        <div />
      )}
      {showNext && handleNext && (
        <Button type="submit" disabled={isStepValid === false || loading}>
          {nextLabel}
        </Button>
      )}
    </div>
  );
}

export default function AdWizard({
  onSubmit,
  initialValues,
  loading,
  isNew,
}: AdWizardProps) {
  // Step indices:
  // -1: Image upload
  //  0: Intent selection
  //  0.5: Template selection (if needed)
  //  1+: Content steps (from steps array)
  //  999: Review
  const [currentStepIndex, setCurrentStepIndex] = useState(-1); // Start at image upload
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(
    null
  );
  const [values, setValues] = useState<Record<string, any>>({
    orientation: "portrait",
    referenceIntent: "none",
  });
  const [steps, setSteps] = useState<Step[]>([]); // Only content steps
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [reviewPrompt, setReviewPrompt] = useState("");
  const [numImages, setNumImages] = useState(1);
  const { credits } = useCredits();

  // Edit mode: if initialValues has imageUrls and prompt, jump to review step
  useEffect(() => {
    if (
      initialValues &&
      initialValues.prompt &&
      initialValues?.imageUrls?.length > 0
    ) {
      setCurrentStepIndex(999);
      setImagePreviews(initialValues.imageUrls);
      setReviewPrompt(initialValues.prompt);
      // Optionally set other values if needed

      setValues((prev) => ({
        ...prev,
        name: initialValues.name,
        brandId: initialValues.brandId,
        quality: initialValues.quality,
        adType: initialValues.adType,
      }));
    }
  }, []);

  // Navigation helpers
  const goToImageUpload = () => {
    setCurrentStepIndex(-1);
    setSelectedIntent(null);
    setSelectedTemplate(null);
    setSteps([]);
    setValues({ orientation: "portrait", referenceIntent: "none" });
  };
  const goToIntentSelection = () => {
    setCurrentStepIndex(0);
    setSelectedIntent(null);
    setSelectedTemplate(null);
    setSteps([]);
    setValues({ orientation: "portrait", referenceIntent: "none" });
  };
  const goToTemplateSelection = () => {
    setCurrentStepIndex(0.5);
  };
  const goToContentStep = (idx: number) => {
    setCurrentStepIndex(idx);
  };
  const goToReview = () => {
    setCurrentStepIndex(999);
  };

  // Step data
  const currentStepData =
    typeof currentStepIndex === "number" &&
    currentStepIndex >= 1 &&
    currentStepIndex < steps.length + 1
      ? steps[currentStepIndex - 1]
      : null;
  const isStepValid = currentStepData
    ? validateStepFields(currentStepData, values) &&
      !!values.name &&
      values.name.trim() !== ""
    : true;

  // Handlers
  const handleImagesChange = (urls: string[], files: File[]) => {
    setImagePreviews(urls);
    setImageFiles(files);
  };

  const handleNext = () => {
    if (currentStepIndex === -1) {
      goToIntentSelection();
    } else if (currentStepIndex === 0) {
      // Intent selection: handled by intent select
    } else if (currentStepIndex === 0.5) {
      // Template selection: handled by template select
    } else if (
      typeof currentStepIndex === "number" &&
      currentStepIndex >= 1 &&
      currentStepIndex < steps.length
    ) {
      goToContentStep(currentStepIndex + 1);
    } else if (
      typeof currentStepIndex === "number" &&
      currentStepIndex === steps.length
    ) {
      // Last content step, go to review
      if (!selectedTemplate) return;
      const templateConfig = templates[selectedTemplate];
      let prompt = templateConfig.generatePrompt(values);
      prompt = appendReferenceIntent(prompt, values.referenceIntent);
      prompt = appendExtraInstructions(prompt, values.extraInstructions);
      setReviewPrompt(prompt);
      goToReview();
    }
  };

  const handleBack = () => {
    if (currentStepIndex === -1) {
      // Already at image upload
      return;
    } else if (currentStepIndex === 0) {
      goToImageUpload();
    } else if (currentStepIndex === 0.5) {
      goToIntentSelection();
    } else if (typeof currentStepIndex === "number" && currentStepIndex === 1) {
      // First content step, go back to template or intent selection
      if (selectedIntent && getTemplatesForIntent(selectedIntent).length > 1) {
        goToTemplateSelection();
      } else {
        goToIntentSelection();
      }
    } else if (
      typeof currentStepIndex === "number" &&
      currentStepIndex > 1 &&
      currentStepIndex < 999
    ) {
      goToContentStep(currentStepIndex - 1);
    } else if (currentStepIndex === 999) {
      goToContentStep(steps.length);
    }
  };

  const handleIntentSelect = (intent: string) => {
    setSelectedIntent(intent);
    const templatesForIntent = getTemplatesForIntent(intent);
    if (templatesForIntent.length === 1) {
      setSelectedTemplate(templatesForIntent[0]);
      const configSteps = getTemplateSteps(templatesForIntent[0]);
      setSteps(configSteps.filter((s) => s.step > 1));
      goToContentStep(1);
    } else {
      goToTemplateSelection();
    }
  };

  const handleTemplateSelect = (template: TemplateType) => {
    setSelectedTemplate(template);
    const configSteps = getTemplateSteps(template);
    setSteps(configSteps.filter((s) => s.step > 1));
    goToContentStep(1);
  };

  let content = null;

  // UI rendering
  if (currentStepIndex === -1) {
    // Image upload
    content = (
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Ads Wizard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <ImageUploader
              images={imagePreviews}
              onImagesChange={handleImagesChange}
            />
          </div>
          <div className="my-6 border-t border-gray-200" />
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border text-sm text-slate-700">
            <ul className="list-disc pl-5 space-y-1">
              <li>Upload high-quality product images for best results.</li>
              <li>
                Use clear, well-lit photos with minimal background clutter.
              </li>
              <li>You can upload up to 4 images.</li>
            </ul>
          </div>
          <div className="flex justify-end mt-8">
            <Button
              onClick={handleNext}
              disabled={imageFiles.length === 0}
              className="px-8"
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (currentStepIndex === 0) {
    // Intent selection
    content = (
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Ads Wizard</CardTitle>
        </CardHeader>
        <CardContent>
          <StepContent
            imagePreviews={imagePreviews}
            onImagesChange={handleImagesChange}
            values={values}
            setValues={setValues}
            footer={renderStepFooter({
              currentStepIndex,
              handleBack,
              showNext: false,
            })}
          >
            <IntentSelection onSelect={handleIntentSelect} />
          </StepContent>
        </CardContent>
      </Card>
    );
  }

  if (currentStepIndex === 0.5 && selectedIntent) {
    // Template selection
    content = (
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Ads Wizard</CardTitle>
        </CardHeader>
        <CardContent>
          <StepContent
            imagePreviews={imagePreviews}
            onImagesChange={handleImagesChange}
            values={values}
            setValues={setValues}
            footer={renderStepFooter({
              currentStepIndex,
              handleBack,
              showNext: false,
            })}
          >
            <TemplateSelection
              intent={selectedIntent}
              onSelect={handleTemplateSelect}
            />
          </StepContent>
        </CardContent>
      </Card>
    );
  }

  if (
    typeof currentStepIndex === "number" &&
    currentStepIndex >= 1 &&
    currentStepIndex <= steps.length
  ) {
    // Content steps
    const stepData = steps[currentStepIndex - 1];
    content = (
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Ads Wizard</CardTitle>
        </CardHeader>
        <CardContent>
          <StepContent
            imagePreviews={imagePreviews}
            onImagesChange={handleImagesChange}
            values={values}
            setValues={setValues}
          >
            <h2 className="text-lg font-semibold mb-2">{stepData.title}</h2>
            {stepData.description && (
              <p className="text-muted-foreground mb-4">
                {stepData.description}
              </p>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleNext();
              }}
              className="space-y-6"
            >
              {stepData.fields
                .filter((field) => !field.showIf || field.showIf(values))
                .map((field) =>
                  renderField(field, values[field.name], (val) =>
                    setValues((prev) => ({ ...prev, [field.name]: val }))
                  )
                )}
              <div className="my-6 border-t border-gray-200" />
              {renderStepFooter({
                currentStepIndex,
                handleBack,
                handleNext,
                isStepValid,
                loading,
              })}
            </form>
          </StepContent>
        </CardContent>
      </Card>
    );
  }

  if (currentStepIndex === 999) {
    // Review step
    const creditsPerImage = CREDITS_COUNT.IMAGES.MEDIUM;
    const maxImagesByCredits = Math.floor(credits / creditsPerImage);
    const maxImages = Math.max(0, Math.min(10, maxImagesByCredits));
    const requiredCredits = numImages * creditsPerImage;
    const isConfirmDisabled = loading || reviewPrompt.trim() === "";
    content = (
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Review & Confirm</CardTitle>
        </CardHeader>
        <CardContent>
          <StepContent
            imagePreviews={imagePreviews}
            onImagesChange={handleImagesChange}
            values={values}
            setValues={setValues}
            footer={
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={loading || !isNew}
                >
                  Back
                </Button>

                <Button
                  onClick={() => setShowConfirmModal(true)}
                  disabled={isConfirmDisabled}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating your ad...
                    </span>
                  ) : (
                    "Confirm & Create"
                  )}
                </Button>
              </div>
            }
          >
            <ReviewStep
              prompt={reviewPrompt}
              setPrompt={setReviewPrompt}
              numImages={numImages}
              setNumImages={setNumImages}
              requiredCredits={requiredCredits}
              maxImages={maxImages}
            />
          </StepContent>
        </CardContent>
      </Card>
    );
  }

  // Fallback
  return (
    <>
      {content}
      {/* Confirmation modal (AlertDialog version) */}
      {showConfirmModal && (
        <AlertDialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Ad Creation</AlertDialogTitle>
              <AlertDialogDescription>
                This operation will consume{" "}
                <b>{numImages * CREDITS_COUNT.IMAGES.MEDIUM}</b> credits. Are
                you sure you want to proceed?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  const payload: AdFormPayload = {
                    prompt: reviewPrompt,
                    images: isNew
                      ? imageFiles
                      : imageFiles.concat(imagePreviews),
                    numSamples: numImages,
                    name: values.name,
                    brandId: values.brandId,
                    quality: values.quality,
                    adType:
                      selectedTemplate === null ? undefined : selectedTemplate,
                  };
                  onSubmit(payload);
                }}
                disabled={loading}
              >
                {loading ? "Creating..." : "Confirm"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
