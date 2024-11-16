'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Upload } from 'lucide-react'

export function VoiceSynthesisFormComponent() {
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState('')
  const [fileError, setFileError] = useState('')
  const [textError, setTextError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setFileError('File size must be less than 5MB')
      } else if (!['audio/wav', 'audio/mpeg'].includes(selectedFile.type)) {
        setFileError('Only .wav and .mp3 files are supported')
      } else {
        setFile(selectedFile)
        setFileError('')
      }
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value
    if (inputText.length > 500) {
      setTextError('Text must be 500 characters or less')
    } else {
      setText(inputText)
      setTextError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      setFileError('Please upload a voice file')
      return
    }
    if (!text.trim()) {
      setTextError('Please enter some text')
      return
    }
    setIsSubmitting(true)

    // Simulating API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      // Here you would typically send the file and text to your backend
      console.log('File:', file)
      console.log('Text:', text)
      alert('Voice synthesis completed successfully!')
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred during voice synthesis')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Voice Synthesis App</CardTitle>
        <CardDescription>Upload a voice file and enter text to synthesize a new voice</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              id="voice-file"
              type="file"
              accept=".wav,.mp3"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            {fileError && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{fileError}</AlertDescription>
              </Alert>
            )}
          </div>
          <div>
            <Textarea
              placeholder="Enter text to synthesize (max 500 characters)"
              value={text}
              onChange={handleTextChange}
              className="min-h-[100px]"
            />
            {textError && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{textError}</AlertDescription>
              </Alert>
            )}
            <p className="text-sm text-muted-foreground mt-1">
              {text.length}/500 characters
            </p>
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Upload className="mr-2 h-4 w-4 animate-spin" />
                Synthesizing...
              </>
            ) : (
              'Synthesize Voice'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}