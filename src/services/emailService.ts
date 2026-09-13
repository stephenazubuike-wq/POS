import { Lead } from '../types';
import { SITE_CONFIG, getLeadEmailMailtoUrl } from '../config/siteConfig';

export interface EmailDispatchResult {
  success: boolean;
  message: string;
  recipient: string;
  error?: string;
}

class EmailService {
  private targetEmail = SITE_CONFIG.NOTIFICATION_EMAIL || 'eduseydzhtech@gmail.com';

  /**
   * Dispatches the complete POS request details to eduseydzhtech@gmail.com
   * Uses the FormSubmit AJAX delivery engine with an HTML table layout.
   */
  async sendPOSRequestEmail(lead: Lead): Promise<EmailDispatchResult> {
    const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(this.targetEmail)}`;

    const payload = {
      _subject: `🚨 [GOLDPOS Lead ${lead.id}] New POS Request: ${lead.businessName} (${lead.preferredProvider} POS)`,
      _template: 'table',
      _captcha: 'false',
      _autoresponse: `Thank you for your POS terminal enquiry. Your reference ID is ${lead.id}. An agent will contact you shortly.`,
      
      // All filled and selected fields mapped cleanly:
      '1_Lead_Reference_ID': lead.id,
      '2_Merchant_Full_Name': lead.fullName,
      '3_Phone_Number': lead.phone,
      '4_WhatsApp_Number': lead.whatsapp,
      '5_Business_Name': lead.businessName,
      '6_Business_Type': lead.businessType,
      '7_Business_Location': lead.location,
      '8_Preferred_POS_Provider': `${lead.preferredProvider} POS`,
      '9_Already_Has_Existing_POS': lead.existingPOS,
      '10_Key_Requirement_Use_Case': lead.requirement,
      '11_Additional_Message_Notes': lead.additionalMessage || 'None provided',
      '12_Submission_Timestamp': new Date().toLocaleString('en-GB', {
        timeZone: 'Africa/Lagos',
        dateStyle: 'full',
        timeStyle: 'medium',
      }),
      '13_Target_Destination': this.targetEmail,
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json().catch(() => ({}));
        return {
          success: true,
          recipient: this.targetEmail,
          message: data.message || `All lead details have been routed to ${this.targetEmail}.`,
        };
      } else {
        const errorText = await response.text().catch(() => 'Network error');
        console.warn('FormSubmit returned non-200 status:', response.status, errorText);
        return {
          success: false,
          recipient: this.targetEmail,
          message: `Unable to automatically dispatch to ${this.targetEmail}. Please check email activation or use the direct email button.`,
          error: errorText,
        };
      }
    } catch (err: any) {
      console.warn('Failed to dispatch email via FormSubmit:', err);
      return {
        success: false,
        recipient: this.targetEmail,
        message: `Network or browser restriction prevented direct dispatch.`,
        error: err?.message || 'Unknown network error',
      };
    }
  }

  /**
   * Returns a direct mailto URI as an instant client fallback
   */
  getMailtoFallback(lead: Lead): string {
    return getLeadEmailMailtoUrl(lead);
  }

  getTargetEmail(): string {
    return this.targetEmail;
  }
}

export const emailService = new EmailService();
