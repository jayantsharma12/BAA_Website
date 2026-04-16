"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, AlertCircle, Download, Upload, ArrowRight } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const membershipCategories = [
  {
    id: "member",
    name: "Member",
    joiningFee: 15000,
    annualFee: 7500,
    description: "For established buying agents seeking growth",
  },
  {
    id: "associate",
    name: "Associate Member",
    joiningFee: 8000,
    annualFee: 4000,
    description: "Perfect for new buying agents entering the industry",
  },
  {
    id: "institutional",
    name: "Institutional Member",
    joiningFee: 15000,
    annualFee: 7500,
    description: "For organizations and trading companies",
  },
]

export function MembershipForm({ onClose, selectedTier }: { onClose?: () => void; selectedTier?: string }) {
  const [step, setStep] = useState<"mode" | "online" | "upload">("mode")
  const [selectedCategory, setSelectedCategory] = useState(
    selectedTier === "Full Member" ? "member" : selectedTier === "Associate Member" ? "associate" : "member"
  )
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    businessType: "",
    address: "",
    message: "",
  })
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")

  const selected = membershipCategories.find((cat) => cat.id === selectedCategory)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const generatePDF = async () => {
    try {
      setSubmitStatus("idle")
      
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate PDF")
      }

      const data = await response.json()

      // Create download link from base64
      const element = document.createElement("a")
      element.setAttribute("href", data.pdfUrl)
      element.setAttribute("download", data.fileName)
      element.style.display = "none"
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)

      setSubmitStatus("success")
      setSubmitMessage("✅ PDF downloaded successfully!")
    } catch (error) {
      console.error("PDF generation error:", error)
      setSubmitStatus("error")
      setSubmitMessage("❌ Failed to generate PDF. Please try again.")
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadFile(file)
      setSubmitStatus("idle")
    }
  }

  const handleOnlineSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.fullName || !formData.email || !formData.phone || !formData.company || !formData.businessType || !formData.address) {
      setSubmitStatus("error")
      setSubmitMessage("❌ Please fill in all required fields")
      return
    }

    try {
      setSubmitStatus("idle")
      setSubmitMessage("📧 Sending your application...")

      // Generate pre-filled PDF first
      const pdfResponse = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
        }),
      })

      if (!pdfResponse.ok) throw new Error("Failed to generate PDF")

      const pdfData = await pdfResponse.json()
      const preFillPdfBase64 = pdfData.pdfUrl.split(",")[1] // Extract base64 from data URI

      // Send complete application with both PDFs
      const response = await fetch("/api/send-membership-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          uploadedFileName: `BAA-Membership-Form-${formData.fullName}-Filled.pdf`,
          uploadedFileBase64: preFillPdfBase64,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to send email")
      }

      setSubmitStatus("success")
      setSubmitMessage("✅ Application sent successfully! Check your email for confirmation.")
      
      setTimeout(() => {
        setFormData({ fullName: "", email: "", phone: "", company: "", businessType: "", address: "", message: "" })
        setSubmitStatus("idle")
        onClose?.()
      }, 2000)
    } catch (error) {
      console.error("Submit error:", error)
      setSubmitStatus("error")
      setSubmitMessage(`❌ ${error instanceof Error ? error.message : "Failed to send application"}`)
    }
  }

  const handleUploadSubmit = async () => {
    if (!uploadFile) {
      setSubmitStatus("error")
      setSubmitMessage("❌ Please select a file to upload")
      return
    }

    try {
      setSubmitStatus("idle")
      setSubmitMessage("📧 Sending your application...")

      // Convert file to Base64
      const reader = new FileReader()
      reader.readAsArrayBuffer(uploadFile)

      reader.onload = async () => {
        const fileBuffer = reader.result as ArrayBuffer
        const fileBase64 = Buffer.from(fileBuffer).toString("base64")

        // Send to backend
        const response = await fetch("/api/send-membership-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: formData.fullName || "Guest User",
            email: formData.email || "noreply@example.com",
            uploadedFileName: uploadFile.name,
            uploadedFileBase64: fileBase64,
          }),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || "Failed to send email")
        }

        setSubmitStatus("success")
        setSubmitMessage("✅ Application sent successfully! Check your email for confirmation.")

        setTimeout(() => {
          setUploadFile(null)
          setFormData({ fullName: "", email: "", phone: "", company: "", businessType: "", address: "", message: "" })
          setSubmitStatus("idle")
          onClose?.()
        }, 2000)
      }

      reader.onerror = () => {
        setSubmitStatus("error")
        setSubmitMessage("❌ Failed to read file. Please try again.")
      }
    } catch (error) {
      console.error("Upload error:", error)
      setSubmitStatus("error")
      setSubmitMessage(`❌ ${error instanceof Error ? error.message : "Failed to send application"}`)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Status Messages */}
      {submitStatus === "success" && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{submitMessage}</AlertDescription>
        </Alert>
      )}

      {submitStatus === "error" && (
        <Alert className="mb-6 bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{submitMessage}</AlertDescription>
        </Alert>
      )}

      {/* STEP 1: Choose Application Mode */}
      {step === "mode" && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Choose Your Application Method</h3>
            <p className="text-muted-foreground">Select how you'd like to apply for membership</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Online Form Option */}
            <Card className="p-6 border-2 border-border hover:border-[#E8520A] transition-colors cursor-pointer" onClick={() => setStep("online")}>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-1">Fill Online Form</h4>
                  <p className="text-sm text-muted-foreground">Complete the form here and submit directly</p>
                </div>
                <ul className="text-sm text-left text-muted-foreground space-y-2 mt-4 w-full">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Quick & Easy
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    No Download Needed
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Instant Submit
                  </li>
                </ul>
                <Button className="w-full mt-4 rounded-full" style={{ backgroundColor: "#E8520A", color: "#fff" }}>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>

            {/* Upload Form Option */}
            <Card className="p-6 border-2 border-border hover:border-[#E8520A] transition-colors cursor-pointer" onClick={() => setStep("upload")}>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <Download className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-1">Download & Upload</h4>
                  <p className="text-sm text-muted-foreground">Download form, fill offline, then upload</p>
                </div>
                <ul className="text-sm text-left text-muted-foreground space-y-2 mt-4 w-full">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Time to Review
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Keep Copy
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Print Option
                  </li>
                </ul>
                <Button className="w-full mt-4 rounded-full" style={{ backgroundColor: "#E8520A", color: "#fff" }}>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* STEP 2: Online Form */}
      {step === "online" && (
        <form onSubmit={handleOnlineSubmit} className="space-y-6">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setStep("mode")}
            className="mb-4"
          >
            ← Back to Options
          </Button>

          {/* Category Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Select Membership Category</h3>
            <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
              <div className="grid gap-3 md:grid-cols-3">
                {membershipCategories.map((category) => (
                  <div key={category.id}>
                    <RadioGroupItem value={category.id} id={category.id} className="hidden" />
                    <Label
                      htmlFor={category.id}
                      className="block cursor-pointer p-4 rounded-lg border-2 border-border hover:border-[#E8520A] transition-colors"
                      style={selectedCategory === category.id ? { backgroundColor: "#FFF5F0", borderColor: "#E8520A" } : {}}
                    >
                      <div className="font-bold text-foreground text-sm">{category.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{category.description}</div>
                      <div className="text-xs mt-2 space-y-1">
                        <div>Joining: ₹{category.joiningFee.toLocaleString()}</div>
                        <div>Annual: ₹{category.annualFee.toLocaleString()}</div>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Fee Summary */}
          {selected && (
            <Card className="p-5" style={{ backgroundColor: "#FFF5F0", borderColor: "#E8520A", borderWidth: "2px" }}>
              <h4 className="font-bold text-foreground mb-4">💰 {selected.name}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Joining Fee:</span>
                  <span className="font-bold">₹{selected.joiningFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Fee:</span>
                  <span className="font-bold">₹{selected.annualFee.toLocaleString()}</span>
                </div>
                <div className="border-t border-[#E8520A]/30 pt-2 flex justify-between font-bold">
                  <span>First Year:</span>
                  <span style={{ color: "#E8520A" }}>₹{(selected.joiningFee + selected.annualFee).toLocaleString()}</span>
                </div>
              </div>
            </Card>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Your Information</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-semibold">Full Name *</Label>
                <Input id="fullName" name="fullName" placeholder="Your full name" value={formData.fullName} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">Email Address *</Label>
                <Input id="email" name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold">Phone Number *</Label>
                <Input id="phone" name="phone" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-semibold">Company Name *</Label>
                <Input id="company" name="company" placeholder="Your company" value={formData.company} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType" className="text-sm font-semibold">Business Type *</Label>
              <Input id="businessType" name="businessType" placeholder="e.g., Import/Export" value={formData.businessType} onChange={handleInputChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-semibold">Business Address *</Label>
              <Textarea id="address" name="address" placeholder="Full business address" rows={3} value={formData.address} onChange={handleInputChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-semibold">Additional Information</Label>
              <Textarea id="message" name="message" placeholder="Any other details you'd like to share" rows={3} value={formData.message} onChange={handleInputChange} />
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" size="lg" className="flex-1 rounded-full font-bold" style={{ backgroundColor: "#E8520A", color: "#fff" }}>
              Send to Email
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="flex-1 rounded-full font-semibold"
              onClick={() => {
                setFormData({ fullName: "", email: "", phone: "", company: "", businessType: "", address: "", message: "" })
                setSubmitStatus("idle")
              }}
            >
              Clear Form
            </Button>
          </div>
        </form>
      )}

      {/* STEP 3: Download & Upload */}
      {step === "upload" && (
        <div className="space-y-6">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setStep("mode")}
            className="mb-4"
          >
            ← Back to Options
          </Button>

          {!uploadFile ? (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">Download & Fill Offline</h3>
                <p className="text-muted-foreground">Download the form with your details pre-filled, fill it at your convenience, then upload it</p>
              </div>

              {/* Pre-fill User Details */}
              <Card className="p-6 bg-blue-50 border-blue-200">
                <h4 className="font-bold text-foreground mb-4">👤 Your Details (Will be pre-filled in form)</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="dl_fullName" className="text-sm font-semibold">Full Name</Label>
                    <Input
                      id="dl_fullName"
                      placeholder="Your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dl_email" className="text-sm font-semibold">Email Address</Label>
                    <Input
                      id="dl_email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="dl_phone" className="text-sm font-semibold">Phone Number</Label>
                    <Input
                      id="dl_phone"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dl_company" className="text-sm font-semibold">Company Name</Label>
                    <Input
                      id="dl_company"
                      placeholder="Your company name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-2 border-dashed" style={{ borderColor: "#E8520A" }}>
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                    <Download className="w-10 h-10 text-green-600" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-foreground mb-2">📥 Download Form with Your Details</h4>
                    <p className="text-sm text-muted-foreground mb-4">Your details will be pre-filled in the form</p>
                    <Button onClick={generatePDF} size="lg" className="rounded-full" style={{ backgroundColor: "#E8520A", color: "#fff" }}>
                      <Download className="mr-2 h-4 w-4" /> Download Form
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="font-bold text-foreground mb-4">📋 Step 1: Do This First</h4>
                <ol className="text-sm space-y-2 text-muted-foreground">
                  <li>✅ Fill in your details above (they'll be in the form)</li>
                  <li>✅ Click the "Download Form" button</li>
                  <li>✅ Print it or fill it on your computer</li>
                  <li>✅ Have your documents ready (ID, PAN, etc.)</li>
                  <li>✅ Sign the form</li>
                </ol>
              </Card>

              <Card className="p-6">
                <h4 className="font-bold text-foreground mb-4">📁 Step 2: Upload Here</h4>
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors"
                  style={{ borderColor: "#E8520A", backgroundColor: "#FFF5F0" }}
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  <Upload className="h-12 w-12 mx-auto mb-2" style={{ color: "#E8520A" }} />
                  <p className="font-semibold text-foreground">Click to upload</p>
                  <p className="text-sm text-muted-foreground">PDF, Word, or Image (.jpg, .png)</p>
                </div>
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                />
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              <Card className="p-6" style={{ backgroundColor: "#F0FDF4", borderColor: "#22C55E", borderWidth: "2px" }}>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-bold text-green-900">File Ready</p>
                    <p className="text-sm text-green-700">{uploadFile.name} ({(uploadFile.size / 1024).toFixed(2)} KB)</p>
                  </div>
                </div>
              </Card>

              <div className="text-center py-4">
                <p className="text-muted-foreground">Your email client will open to send this file</p>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleUploadSubmit} size="lg" className="flex-1 rounded-full font-bold" style={{ backgroundColor: "#E8520A", color: "#fff" }}>
                  Send to Email
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="flex-1 rounded-full"
                  onClick={() => {
                    setUploadFile(null)
                    const input = document.getElementById("fileInput") as HTMLInputElement
                    if (input) input.value = ""
                  }}
                >
                  Choose Different File
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
