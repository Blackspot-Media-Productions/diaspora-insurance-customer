"use client";

import { useState, type ChangeEvent, type SubmitEvent } from "react";
import {
  coverInclusionAndCosts,
  customerRecommendationRating,
  customerSupportRating,
  firstEnquiryReplyTime,
  socialPlatforms,
} from "./data";
import Image from "next/image";
import LongText from "@/components/LongText";
import Checkbox from "@/components/Checkbox";
import Dropdown from "@/components/Dropdown";
import ShortText from "@/components/ShortText";
import Radio from "@/components/Radio";

const initialFormState = {
  referral_source: "",
  contact_source: [],
  residence_country: "",
  members_residence_country: "",
  cover_inclusion_and_costs: "",
  customer_questions: "",
  first_enquiry_channel: "",
  first_enquiry_reply_time: "",
  customer_support_rating: "",
  cross_border_friction_notes: "",
  customer_recommendation_rating: "",
  customer_improvement_suggestion: "",
};

export default function HomepageUI() {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [otherToggles, setOtherToggles] = useState({
    contact_source: false,
    first_enquiry_channel: false,
  });

  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof formData, boolean>>
  >({});

  const handleOtherToggle = (groupName: string, value?: string) => {
    const toggleGroupName = groupName as keyof typeof otherToggles;
    const formGroupName = groupName as keyof typeof formData;

    setOtherToggles((prev) => {
      const nextState = !prev[toggleGroupName];
      const isArrayValue = Array.isArray(formData[formGroupName]);
      if (!nextState) {
        setFormData((prevForm) => ({
          ...prevForm,
          [groupName]: isArrayValue
            ? (prevForm[formGroupName] as string[]).filter(
                (p: string) => p !== value,
              )
            : value,
        }));
      }

      return { ...prev, [groupName]: nextState };
    });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Array.isArray(formData[name as keyof typeof formData])
        ? [...prev[name as keyof typeof formData], value]
        : value,
    }));
  };

  const handleCheckboxChange = (groupName: string, value: string) => {
    setFormData((prev) => {
      const current = (prev[groupName as keyof typeof formData] ||
        []) as string[];
      if (Array.isArray(current)) {
        const updated = current.includes(value)
          ? current.filter((item: string) => item !== value)
          : [...current, value];
        return { ...prev, [groupName]: updated };
      }

      return prev;
    });
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const form = e.currentTarget;
    const newErrors: typeof errors = {};

    const isValid = form.checkValidity();
    if (!isValid) {
      Object.entries(formData).forEach(([key, value]) => {
        if (value === "" || value.length === 0) {
          newErrors[key as keyof typeof errors] = true;
        }
      });

      setErrors(newErrors);
      setAlert({
        show: true,
        type: "danger",
        message: "Please fill out all required fields before submitting.",
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok || !response.body) {
        const data = await response.json();
        throw new Error(data.error ?? "The response could not be sent.");
      }

      setAlert({
        show: true,
        type: "success",
        message:
          "Thank you! Your questionnaire has been submitted successfully.",
      });

      // Scroll to the top alert
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Reset form & errors on success
      setFormData(initialFormState);
      setErrors({});
    } catch (requestError) {
      setAlert({
        show: true,
        type: "danger",
        message:
          requestError instanceof Error
            ? requestError.message
            : "The response could not be sent.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Top bar */}
      <div className="h-1.5 bg-brand"></div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Form Card Container */}
        <div className="bg-white rounded-[14px] p-6 sm:p-[2.5rem_2.25rem] shadow-[0_10px_30px_rgba(0,0,0,0.06)] mx-auto max-w-190">
          {/* Header */}
          <div className="text-center mb-6">
            <Image
              src="/logo.png"
              alt="BlackSpot Media"
              width={110}
              height={110}
              className="max-w-27.5 object-cover rounded-full shadow-[0_4px_18px_rgba(0,0,0,0.18)] mb-3 mx-auto"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <h1 className="font-title font-bold text-[1.6rem] leading-tight mb-2">
              Diaspora Insurance Customer Questionnaire
            </h1>
            <p className="text-[#6c6c75] text-base mb-1">
              Thank you for choosing to work with us.
            </p>
            <p className="text-sm text-[#6c6c75] mb-4 leading-relaxed">
              This form helps us understand your business, purpose, your
              audience, your goals, and where your brand currently stands, so we
              can develop a strategy that drives real growth. Whether
              you&apos;re a startup finding your voice or an established
              business ready to rebrand, your answers shape everything we build
              together.
            </p>
            <p className="text-sm italic text-[#6c6c75] mb-4">
              Please take your time to be as detailed as possible. The more we
              know, the better we can serve you.
            </p>
            <p className="text-sm font-bold text-[#14141a]">
              Note: following the submission of this form, your brand
              consultation document will be delivered within 5 working days.
            </p>
          </div>

          {/* Form Alert */}
          {alert.show && (
            <div
              id="formAlert"
              className={`p-4 mb-4 text-sm rounded-lg border ${
                alert.type === "success"
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-error-background border-error-border text-error-content"
              }`}
              role="alert"
            >
              {alert.message}
            </div>
          )}

          <form id="consultationForm" onSubmit={handleSubmit} noValidate>
            <LongText
              label="How did you first hear about Diaspora Insurance?"
              name="referral_source"
              required
              hasError={errors.referral_source || false}
              onChange={handleInputChange}
              value={formData.referral_source}
            />

            <Checkbox
              idPrefix="cs"
              label="Which platforms do you use to follow or contact Diaspora Insurance?"
              name="contact_source"
              selected={formData.contact_source}
              items={socialPlatforms}
              hasError={errors.contact_source || false}
              onChange={(value) =>
                handleCheckboxChange("contact_source", value)
              }
              required
              triggerOtherToggle={(name, value) =>
                handleOtherToggle(name, value)
              }
              hasOtherInput={{
                status: true,
                onChange: (value) => {
                  if (value !== "") {
                    handleInputChange({
                      target: { name: "contact_source", value },
                    } as ChangeEvent<HTMLInputElement>);
                  }
                },
              }}
            />

            <div className="flex flex-wrap gap-x-4">
              <ShortText
                label="Which country do you live in?"
                name="residence_country"
                hasError={errors.residence_country || false}
                value={formData.residence_country}
                onChange={handleInputChange}
                required
              />
              <ShortText
                label="In which country do the people you protect with your policy live?"
                name="members_residence_country"
                hasError={errors.members_residence_country || false}
                value={formData.members_residence_country}
                onChange={handleInputChange}
                required
              />
            </div>

            <Dropdown
              items={coverInclusionAndCosts}
              label="How easy was it to understand what your cover includes and what it costs?"
              name="cover_inclusion_and_costs"
              required
              value={formData.cover_inclusion_and_costs}
              onChange={handleInputChange}
              hasError={errors.cover_inclusion_and_costs || false}
            />

            <LongText
              label="What questions did you have before buying that were hard to get answers to?"
              name="customer_questions"
              hasError={errors.customer_questions || false}
              value={formData.customer_questions}
              onChange={handleInputChange}
              required
            />

            <Radio
              label="How did you make your first enquiry?"
              idPrefix="fe"
              selected={formData.first_enquiry_channel}
              name="first_enquiry_channel"
              items={socialPlatforms.filter((s) => s !== "Other")}
              onChange={handleInputChange}
              required
              hasError={errors.first_enquiry_channel || false}
            />

            <Dropdown
              items={firstEnquiryReplyTime}
              label="How long did it take to get a reply?"
              name="first_enquiry_reply_time"
              value={formData.first_enquiry_reply_time}
              required
              onChange={handleInputChange}
              hasError={errors.first_enquiry_reply_time || false}
            />

            <Radio
              idPrefix="csr"
              label="How would you rate the support you have received since becoming a customer?"
              name="customer_support_rating"
              selected={formData.customer_support_rating}
              required
              items={customerSupportRating}
              onChange={handleInputChange}
              hasError={errors.customer_support_rating || false}
            />

            <LongText
              label="What would make it easier for you to buy, pay or claim from abroad?"
              name="cross_border_friction_notes"
              hasError={errors.cross_border_friction_notes || false}
              value={formData.cross_border_friction_notes}
              required
              onChange={handleInputChange}
            />

            <Radio
              idPrefix="crr"
              label="How likely are you to recommend Diaspora Insurance to family and friends?"
              name="customer_recommendation_rating"
              selected={formData.customer_recommendation_rating}
              required
              items={customerRecommendationRating}
              onChange={handleInputChange}
              hasError={errors.customer_recommendation_rating || false}
            />

            <LongText
              label="What is one thing Diaspora Insurance should start, improve or stop doing?"
              name="customer_improvement_suggestion"
              hasError={errors.customer_improvement_suggestion || false}
              onChange={handleInputChange}
              value={formData.customer_improvement_suggestion}
              required
            />

            {/* Submit Button */}
            <div className="text-center mt-12">
              <button
                type="submit"
                id="submitBtn"
                disabled={loading}
                className="bg-brand hover:bg-[#e07f00] text-white font-semibold py-3 px-12 rounded-lg text-lg transition-colors duration-200 border border-brand"
              >
                {loading ? "Sending..." : "Submit Questionnaire"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
